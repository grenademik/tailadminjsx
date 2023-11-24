"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb"
import TableTwo from "@/components/Tables/CategoryTable"

// export const metadata: Metadata = {
//   title: "Users | bePasal",
//   description: "This is Tables page for TailAdmin Next.js",
//   // other metadata
// };

// Use the defined type for the component props
const TablesPage = ({ items }) => {
  console.log(items)
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        {/* Pass items as a prop to TableTwo */}
        <TableTwo
          title={"Users"}
          buttonText={"Invite User"}
          data={items}
          link={""}
          results={undefined}
        />
      </div>
    </>
  )
}

export default TablesPage
