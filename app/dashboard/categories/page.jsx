"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import TableTwo from "@/components/Tables/CategoryTable"
import { get } from "../../api/index"
import { useEffect, useState } from "react"

// Use the defined type for the component props
const CategoriesPage = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    get(`/oms/categories/`).then(res => {
      setItems(res)
    })
  }, [])

  return (
    <>
      <Breadcrumb pageName="Categories" />

      <div className="flex flex-col gap-10">
        {/* Pass items as a prop to TableTwo */}
        <TableTwo
          title={"Categories"}
          buttonText={"Add Category"}
          data={items}
          link="categories/add_category"
          results={undefined}
        />
      </div>
    </>
  )
}

export default CategoriesPage
