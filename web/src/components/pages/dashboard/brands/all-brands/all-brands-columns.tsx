import { Button } from "@/components/ui/button"
import { ColumnDef, Row } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Brand } from "./all-brands.type"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Link } from "react-router-dom"
import { useDeleteBrandMutation } from "@/store/features/brand/brand-api"

const ActionCell = ({ row }: { row: Row<Brand> }) => {
  const brand = row.original

  const [deleteBrand] = useDeleteBrandMutation()
  const { toast } = useToast()

  const handleDeleteBrand = async (id: string) => {
    try {
      await deleteBrand(id).unwrap()
      toast({
        title: "Success!",
        description: "Brand deleted successfully!",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Something went wrong!",
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link to={`/dashboard/brands/update?id=${brand.id}&name=${brand.name}&description=${brand.description}`}>
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteBrand(brand.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const allBrandColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionCell,
  },
]
