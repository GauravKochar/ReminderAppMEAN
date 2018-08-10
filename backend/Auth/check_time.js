exports.checkTime= function (element,now)
{
  if( element.endDate.getFullYear() > now.getFullYear()
  ||(element.endDate.getFullYear() === now.getFullYear() && element.endDate.getMonth() > now.getMonth())
  ||(element.endDate.getMonth() === now.getMonth() && element.endDate.getDate() > now.getDate())
  ||(element.endDate.getDate() === now.getDate() && element.endDate.getHours() > now.getHours())
  ||(element.endDate.getHours() === now.getHours() && element.endDate.getMinutes() > now.getMinutes())) {


    return true;

        }
  return false;

}
