import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// export const createSubCategoryService = async ({ name }: { name: string }) => {
//   return await prisma.subCategory.create({
//     data: { name },
//   })
// }

export const getSubCategoryService = async () => {
  return await prisma.subCategory.findMany({})
}

export const updateSubCategoryService = async ({
  name,
  id,
}: {
  name: string
  id: string
}) => {
  return await prisma.subCategory.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })
}

export const deleteSubCategoryService = async ({ id }: { id: string }) => {
  return await prisma.subCategory.delete({
    where: {
      id,
    },
  })
}
