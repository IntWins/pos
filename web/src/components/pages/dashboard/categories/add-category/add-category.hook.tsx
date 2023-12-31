import { useCreateCategoryMutation, useUpdateCategoryMutation } from "@/store/features/category/category-api"
import { SubmitHandler, useForm } from "react-hook-form"
import { InputType, addCategorySchema } from "./add-category.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { useLocation, useSearchParams } from "react-router-dom"

export const useAddCategory = () => {
  const [createCategory, { isLoading: isCreateLoading, isError: isCreateError }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: isUpdateLoading, isError: isUpdateError }] = useUpdateCategoryMutation()
  const { toast } = useToast()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const isUpdateMode = location.pathname.includes("update")
  const isLoading = isCreateLoading || isUpdateLoading
  const isError = isCreateError || isUpdateError

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<InputType>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      name: searchParams.get("name") || "",
      description: searchParams.get("description") || "",
    },
  })

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    if (isUpdateMode && searchParams.get("id")) {
      try {
        await updateCategory({
          ...data,
          categoryId: searchParams.get("id") as string,
        }).unwrap()
        toast({
          title: "Category updated successfully",
          description: "success",
        })
        reset()
      } catch (error) {
        console.error(error)
        toast({
          variant: "destructive",
          title: "Error updating category",
        })
      }
    } else {
      try {
        await createCategory(data).unwrap()
        toast({
          title: "Category created successfully",
          description: "success",
        })
        reset()
      } catch (error) {
        console.error(error)
        toast({
          variant: "destructive",
          title: "Error creating category",
        })
      }
    }
  }

  const submitHandler = handleSubmit(onSubmit)

  return {
    register,
    isLoading,
    formErrors,
    isError,
    submitHandler,
    isUpdateMode,
  }
}
