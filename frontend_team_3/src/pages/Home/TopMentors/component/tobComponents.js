import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Image } from "react-bootstrap"
import { faStar } from "@fortawesome/free-solid-svg-icons";
import './style.css'

const Top = ({ rating, reviews, name, destinagiton, img }) => {
    <div className='mentors-cont'>
        <div className="top-ment-info">
            <Image src={img} />
            <div className="rate">
                <p>
                    <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: "#f9d03b" }}
                    />
                    {rating}
                    <span>({reviews})</span>
                </p>
            </div>
        </div>
        <div className='mentor-details'>
            <h4>{name}</h4>
            <p>{destinagiton}</p>
        </div>
    </div>
}
export default Top