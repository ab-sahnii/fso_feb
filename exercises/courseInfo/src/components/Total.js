const Total = ({parts}) => {
    const totalValue = parts.reduce((a,v) => a+v.exercises, 0)
    return(
      <p><b>Total of {totalValue} exercises </b></p>
    )
  }


export default Total;