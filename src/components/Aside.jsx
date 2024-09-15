import { SiDash } from "react-icons/si"
import { Link } from "react-router-dom"
import { btnData } from "../store/consts";
import Button from "./PageComponents/Button";



const Aside = () => {
  return (
    <div className='shadow-lg border-[1px] h-full'>
      <div className="p-3">
        <Link path='/'>
          <div className="flex justify-center items-center gap-2 pb-2 border-b-2">
            <SiDash className="text-[24px] text-blue-700" />
            <span className="text-[28px] font-bold text-blue-700">Dashboard</span>
          </div>
        </Link>
        <div className="flex flex-col gap-1 mt-3">
          {btnData.map(item => {
            const Icon = item.icon
            return (
              <Link key={item.id} to={item.path}>
                <Button item={item} Icon={Icon} />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Aside