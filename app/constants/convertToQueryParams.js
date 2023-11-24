function convertToQueryParams(obj) {
    const queryParams = Object.entries(obj)
      .filter(([_, value]) => value !== "" && value !== null) // Filter out empty strings and null values
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
    return queryParams ? `?${queryParams}` : ""
  }
  export default convertToQueryParams
  