import React from "react";
import UserIcon from "./UserIcon";

function Message(){
    return(
        <div className="MessageMainDiv">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOzfYPaLIvUyXadENQul27Z4R2Nuc2nuhDHHLbF8eATKEYN4SjdUoZIlWpkH9Ov4Mryc&usqp=CAU" />
            <div>
                <div>
                    <h6>Steve</h6>
                    <p className="time">Today at 11:35 PM</p>
                </div>
                <p className="messageBody">Contrary to popular belief, Lorem Ipsum is not simply random text.
                It has roots in a piece of classical Latin literature from 45 BC,
                making it over 2000 years old. Richard McClintock, a Latin professor at
                Hampden-Sydney College in Virginia, looked up one of the more obscure
                Latin words, consectetur, from a Lorem Ipsum passage, and going through
                the cites of the word in classical literature, discovered the
                undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
                and Evil) by Cicero, written in 45 BC. This book is a treatise on
                the theory of ethics, very popular during the Renaissance.
                The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", 
                comes from a line in section 1.10.32.</p>
            </div>
        </div>
    )
}

export default Message