"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { useRouter } from "next/navigation"
import { postApi } from "../../../api/index"
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo"
import SwitcherThree from "@/components/Switchers/SwitcherThree"
import { useState } from "react"

// Use the defined type for the component props
const TablesPage = ({ items }) => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    price: 0,
    invoiceDate: "",
    status: "",
    selling_price: 0,
    crossed_price: 0,
    quantity: 0,
    sku: "",
    is_active: false,
    name: "",
    description: "",
    continue_selling_after_out_of_stock: false,
    slug: "",
    catagories: [],
    thumbnail_image: ""
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // setPreviewLogo(reader.result);
        setFormData(prevValues => ({
          ...prevValues,
          thumbnail_image: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await postApi("/oms/items/", {
        price: formData.price,
        invoiceDate: formData.invoiceDate,
        status: formData.status,
        selling_price: formData.selling_price,
        crossed_price: formData.crossed_price,
        quantity: formData.quantity,
        sku: formData.sku,
        is_active: formData.is_active,
        name: formData.name,
        description: formData.description,
        continue_selling_after_out_of_stock:
          formData.continue_selling_after_out_of_stock,
        slug: formData.slug,
        catagories: formData.catagories,
        thumbnail_image: formData.thumbnail_image
      })

      // Check if the API call was successful
      if (response) {
        // Handle the successful response, e.g. show a success message
        router.push("/dashboard/products/")
        // Reset the form data after successful sign-up
      }
    } catch (error) {
      // Handle API call errors, which are already handled in postApi function
      console.error("Failed", error)
    }
  }

  return (
    <>
      <Breadcrumb pageName="Add Product" />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between">
                <h3 className="font-medium text-black dark:text-white">
                  Active
                </h3>
                <SwitcherThree />
              </div>

              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Product Name
                  </label>
                  <input
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    type="text"
                    placeholder="Ex. Speaker"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Categories
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Select product cateogory</option>
                      <option value="">USA</option>
                      <option value="">UK</option>
                      <option value="">Canada</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Product Description
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

                <div className="mb-4.5">
                  <label className="mb-3 block text-black dark:text-white">
                    Upload Image
                  </label>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Selling Price
                  </label>
                  <input
                    name="selling_price"
                    onChange={handleChange}
                    value={formData.selling_price}
                    type="integer"
                    placeholder="Ex. 250"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Crossed Price
                  </label>
                  <input
                    name="crossed_price"
                    onChange={handleChange}
                    value={formData.crossed_price}
                    type="integer"
                    placeholder="Ex. 250"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Quantity
                  </label>
                  <input
                    name="quantity"
                    onChange={handleChange}
                    value={formData.quantity}
                    type="integer"
                    placeholder="Ex. 15"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <CheckboxTwo
                    checkboxText={"Continue Selling after out of stock"}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    SKU
                  </label>
                  <input
                    name="sku"
                    onChange={handleChange}
                    value={formData.sku}
                    type="integer"
                    placeholder="Ex. EX001"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default TablesPage
function setPreviewLogo(result) {
  throw new Error("Function not implemented.")
}
