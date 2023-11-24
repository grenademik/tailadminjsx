"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { useRouter } from "next/navigation"
import { postApi } from "../../../api/index"
import SwitcherThree from "@/components/Switchers/SwitcherThree"
import { useState } from "react"

// Define the type of the items prop
// interface TablesPageProps {
//   items: Array<any>; // You can replace 'any' with a more specific type if available
// }

// export const metadata: Metadata = {
//   title: "Products | bePasal",
//   description: "This is Tables page for TailAdmin Next.js",
//   // other metadata
// };

// Use the defined type for the component props

const TablesPage = ({}) => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: ""
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await postApi("/oms/categories/", {
        name: formData.name,
        description: formData.description
      })

      // Check if the API call was successful
      if (response) {
        // Handle the successful response, e.g. show a success message
        router.push("/dashboard/categories/")
        // Reset the form data after successful sign-up
      }
    } catch (error) {
      // Handle API call errors, which are already handled in postApi function
      console.error("Failed", error)
    }
  }

  return (
    <>
      <Breadcrumb pageName="Add Category" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between">
              <h3 className="font-medium text-black dark:text-white">Active</h3>
              <SwitcherThree />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category Name
                  </label>
                  <input
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    type="text"
                    placeholder="Ex. T-shirt"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Category Description
                  </label>
                  <input
                    name="description"
                    onChange={handleChange}
                    type="text"
                    value={formData.description}
                    placeholder="Write details about your product"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default TablesPage
