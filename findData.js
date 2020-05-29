function getInvNumAndDates (body, i, title){
    let dates
    let inNum

    if(!body) return ['error', i]


    //find "Invoice #"
    let invIdx = body.findIndex( obj => obj["R"][0]["T"] === 'Invoice%23')
    let adjInvIdx = invIdx + 4
    if(!body[adjInvIdx]) return ['unexpected values', i, title]
    invIdx = body[adjInvIdx]["R"][0]["T"]

    //find Flight
    let flightIdx = body.findIndex( obj => obj["R"][0]["T"] === 'Flight' )
    let adjFlightIdx = flightIdx + 4
    flightIdx = body[adjFlightIdx]["R"][0]["T"]


          //Error check

    if(validInv(invIdx) && validDate(flightIdx)){
      return [invIdx, flightIdx, title]
    } else return ['unexpected values', i, title]



}

function validInv(inv){
  const version = inv.slice(-2)
    //RegEx invoice
      //Invoice format: 1935634-2
      //Last two digits should always be 'dash something'
  return(version[0] === '-' && typeof(parseInt(version[1])) === 'number')
}

function validDate(date){
  //RegEx invoice and flights
  //Date format: 10%2F28%2F19-11%2F24%2F19
  const dates = date.split('-')

  return (dates && (dates[0].split('%').length === 3 && dates[1].split('%').length === 3))

}

module.exports = {
  getInvNumAndDates: getInvNumAndDates
}