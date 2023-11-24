import Link from "next/link"

const CategoryTable = ({ title, buttonText, data, link }) => {
  const nextPage = () => {
    const dataToSend = "Hello from Child!"
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>
        <Link
          href={link}
          className="cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
        >
          {buttonText}
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">SKU</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-1 pl-5 flex items-center">
          <p className="font-medium">Qty</p>
        </div>
        <div className="col-span-1 pl-5 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 pl-5  flex items-center">
          <p className="font-medium">Status</p>
        </div>
      </div>

      {data.results?.map((dataItem, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {dataItem.sku}
              </p>
            </div>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md ">
                <img
                  src={dataItem.thumbnail_image}
                  className="object-cover h-12 w-12"
                  alt={dataItem.name}
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {dataItem.name || "No Name"}
              </p>
            </div>
          </div>
          <div className="col-span-1 pl-5 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {dataItem.quantity || "No Description"}
              </p>
            </div>
          </div>
          <div className="col-span-1 pl-5 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {dataItem.selling_price || "No Description"}
              </p>
            </div>
          </div>

          <div className="col-span-1 pl-5  hidden items-center sm:flex">
            <p
              className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium 
              ${
                dataItem.is_active
                  ? "text-success bg-success"
                  : "text-danger bg-danger"
              }`}
            >
              {dataItem.is_active ? "Active" : "No Status"}
            </p>
          </div>
        </div>
      ))}

      <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-end">
        <nav>
          <ul className="flex flex-wrap items-center">
            <li>
              <a
                className="flex h-9 w-9 items-center justify-center rounded-l-md border border-stroke hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark"
                href={data.previous}
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
              </a>
            </li>
            <li>
              <a
                className="flex items-center justify-center border border-stroke border-l-transparent py-[5px] px-4 font-medium hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark"
                href="#"
              >
                1
              </a>
            </li>
            <li>
              <a
                className="flex items-center justify-center border border-stroke border-l-transparent py-[5px] px-4 font-medium hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark"
                href="#"
              >
                2
              </a>
            </li>
            <li>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-r-md border border-stroke border-l-transparent hover:border-primary hover:bg-gray hover:text-primary dark:border-strokedark dark:hover:border-primary dark:hover:bg-graydark"
                onClick={nextPage}
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
      </div>
    </div>
  )
}

export default CategoryTable
