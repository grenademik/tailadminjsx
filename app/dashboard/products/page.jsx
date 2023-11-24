"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import ProductTable from "@/components/Tables/ProductTable"
import { get } from "../../api/index"
import { useEffect, useState } from "react"
import convertToQueryParams from "@/app/constants/convertToQueryParams"


const TablesPage = () => {
  const [items, setItems] = useState([])

  const [filters, setFilters] = useState({
    ordering: null,
    page: 1,
    search: null,
    size: 4
  })

  useEffect(() => {
    get(`/oms/items/${convertToQueryParams(filters)}`).then(res => {
      setItems(res)
    })
  }, [filters])

  const handlePageChange = value => {
    setFilters(prevFilters => ({
      ...prevFilters,
      page: prevFilters.page + value
    }))
  }

  const handleRowsPerPageChange = event => {
    setFilters({ ...filters, size: event.target.value })
  }

  const handlePaginationChange = value => {
    setFilters({ ...filters, page: value })
  }

  const totalPages = Math.ceil(items.count / filters.size)

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  return (
    <>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
        <select onChange={event => handleRowsPerPageChange(event)}>
          <option value={2}>10</option>
          <option value={3}>20</option>
          <option value={4}>30</option>
        </select>

        <nav>
          <ul className="flex flex-wrap items-center">
            <li>
              <button
                onClick={() => handlePageChange(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-l-md border border-stroke hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark"
              >
                <svg
                  className="fill-current"
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.17578 15.1156C7.00703 15.1156 6.83828 15.0593 6.72578 14.9187L0.369531 8.44995C0.116406 8.19683 0.116406 7.80308 0.369531 7.54995L6.72578 1.0812C6.97891 0.828076 7.37266 0.828076 7.62578 1.0812C7.87891 1.33433 7.87891 1.72808 7.62578 1.9812L1.71953 7.99995L7.65391 14.0187C7.90703 14.2718 7.90703 14.6656 7.65391 14.9187C7.48516 15.0312 7.34453 15.1156 7.17578 15.1156Z"
                    fill=""
                  ></path>
                </svg>
              </button>
            </li>
            {pageNumbers.map(pageNumber => (
              <li key={pageNumber}>
                <button
                  onClick={() => handlePaginationChange(pageNumber)}
                  className={`flex items-center justify-center border ${
                    pageNumber === filters.page
                      ? "border-primary bg-primary text-white   dark:border-primary dark:bg-graydark "
                      : ""
                  } border-stroke border-l-transparent py-[5px] px-4 font-medium hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary  dark:hover:bg-graydark`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(1)}
                className="flex h-9 w-9 items-center justify-center rounded-r-md border border-stroke border-l-transparent hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark"
              >
                <svg
                  className="fill-current"
                  width="8"
                  height="16"
                  viewBox="0 0 8 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.819531 15.1156C0.650781 15.1156 0.510156 15.0593 0.369531 14.9468C0.116406 14.6937 0.116406 14.3 0.369531 14.0468L6.27578 7.99995L0.369531 1.9812C0.116406 1.72808 0.116406 1.33433 0.369531 1.0812C0.622656 0.828076 1.01641 0.828076 1.26953 1.0812L7.62578 7.54995C7.87891 7.80308 7.87891 8.19683 7.62578 8.44995L1.26953 14.9187C1.15703 15.0312 0.988281 15.1156 0.819531 15.1156Z"
                    fill=""
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
        {/* Pass items as a prop to ProductTable */}
        <ProductTable
          title={"Products"}
          buttonText={"Add Product"}
          data={items}
          link="products/add_product"
          results={undefined}
        />
      </div>
    </>
  )
}

export default TablesPage
function useItemSlugs(arg0) {
  throw new Error("Function not implemented.")
}
