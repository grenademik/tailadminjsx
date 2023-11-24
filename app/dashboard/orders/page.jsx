"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import { get } from "../../api/index"
import { useEffect, useState } from "react"
import ProductTable from "@/components/Tables/ProductTable"

const OrdersPage = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    get(`/oms/orders/`).then(res => {
      setItems(res)
    })
  }, [])

  return (
    <>
      <Breadcrumb pageName="Orders" />
      <div className="flex flex-col gap-10">
        <ProductTable
          title={"Orders"}
          buttonText={"Create Order"}
          data={items}
          link="orders/create_order"
          results={undefined}
        />
      </div>
    </>
  )
}

export default OrdersPage
