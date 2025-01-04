const FormatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0];
  };

  export default FormatDate 