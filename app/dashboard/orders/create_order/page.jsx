"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { get, postApi } from "../../../api/index"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const TablesPage = ({ items }) => {
  const router = useRouter()

  const [products, setProducts] = useState([])

  useEffect(() => {
    get(`/oms/items/`).then(res => {
      setProducts(res)
    })
  }, [])

  const [formData, setFormData] = useState({
    status_detail: {
      is_active: false,
      title: "",
      name: "",
      subtract_from_inventory: false
    },
    is_active: false,
    user_name: "",
    user_contact: "",
    delivery_note: "",
    delivery_location: "",
    geo_tag: "",
    total_price: "",
    total_discount_amount: "",
    extra_discount: "",
    discount_remarks: "",
    total_bill_amount: "",
    total_amount_paid: "",
    is_refunded: false,
    is_cancelled: false,
    cancellation_remarks: "",
    refunded_remarks: "",
    user: null,
    status: 0
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
      const response = await postApi("/oms/orders/", {
        status_detail: {
          is_active: formData.status_detail.is_active,
          title: formData.status_detail.title,
          name: formData.status_detail.name,
          subtract_from_inventory:
            formData.status_detail.subtract_from_inventory
        },
        is_active: formData.is_active,
        user_name: formData.user_name,
        user_contact: formData.user_contact,
        delivery_note: formData.delivery_note,
        delivery_location: formData.delivery_location,
        geo_tag: formData.geo_tag,
        total_price: formData.total_price,
        total_discount_amount: formData.total_discount_amount,
        extra_discount: formData.extra_discount,
        discount_remarks: formData.discount_remarks,
        total_bill_amount: formData.total_bill_amount,
        total_amount_paid: formData.total_amount_paid,
        is_refunded: formData.is_refunded,
        is_cancelled: formData.is_cancelled,
        cancellation_remarks: formData.cancellation_remarks,
        refunded_remarks: formData.refunded_remarks,
        user: formData.user,
        status: formData.status
      })

      // Check if the API call was successful
      if (response) {
        // Handle the successful response, e.g. show a success message
        router.push("/dashboard/orders/")
        // Reset the form data after successful submission
        setFormData({
          status_detail: {
            is_active: false,
            title: "",
            name: "",
            subtract_from_inventory: false
          },
          is_active: false,
          user_name: "",
          user_contact: "",
          delivery_note: "",
          delivery_location: "",
          geo_tag: {
            // You need to provide actual data for GeoTag based on its structure
          },
          total_price: "",
          total_discount_amount: "",
          extra_discount: "",
          discount_remarks: "",
          total_bill_amount: "",
          total_amount_paid: "",
          is_refunded: false,
          is_cancelled: false,
          cancellation_remarks: "",
          refunded_remarks: "",
          user: null,
          status: 0
        })
      }
    } catch (error) {
      // Handle API call errors, which are already handled in postApi function
      console.error("Failed", error)
    }
  }

  return (
    <>
      <Breadcrumb pageName="Create Order" />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Products
                  </label>
                  <div className="flex space-x-2">
                    <button className="justify-center rounded bg-primary p-3 font-medium text-gray">
                      Select Product
                    </button>
                    <button className="justify-center rounded bg-secondary p-3 font-medium text-gray">
                      Add Custom Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Customer Details
                </h3>
              </div>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Full Name
                  </label>
                  <input
                    name="user_name"
                    onChange={handleChange}
                    value={formData.user_name}
                    type="string"
                    placeholder="Ex. Ramesh Gurung"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Contact Number
                  </label>
                  <input
                    name="user_contact"
                    onChange={handleChange}
                    value={formData.user_contact}
                    type="integer"
                    placeholder="Ex. 98XXXXXXXX"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Delivery Location
                  </label>
                  <input
                    name="delivery_location"
                    onChange={handleChange}
                    value={formData.delivery_location}
                    type="string"
                    placeholder="Ex. Lagankhel -12, Kathmandu"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Delivery Note
                  </label>
                  <input
                    name="delivery_note"
                    onChange={handleChange}
                    value={formData.delivery_note}
                    type="string"
                    placeholder="Write details about your product"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Order Details
                </h3>
              </div>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Full Name
                  </label>
                  <input
                    type="string"
                    placeholder="Ex. Ramesh Gurung"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Create Order
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
