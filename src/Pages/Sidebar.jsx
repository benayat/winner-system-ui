import './Sidebar.css';
import SidebarItem from "../Components/SidebarComponents/SidebarItem";
import {GUEST_PERMISSION, sidebarItems} from "../constants";
import LoginArea from "../Components/SidebarComponents/LoginArea";
import {useSelector, useDispatch} from "react-redux";
import {setActiveItem} from "../redux/dashboardRecucer";

const Sidebar = () => {
    const userName = useSelector((state) => state.user.userName);
    const activeItem = useSelector((state) => state.dashboard.activeItem);
    const seasonActive = useSelector((state) => state.season.seasonActive);
    const dispatch = useDispatch();

    const onSidebarItemClick = (title) => {
        dispatch(setActiveItem(title));
    }
    return (<div className={"sidebar-container"}>
            <LoginArea/>
            {seasonActive === true && (<>
                    <h1>Choose Dashboard</h1>
                    <ul className={"item_list"}>
                        {sidebarItems.filter(item => userName === "Guest" ? item.permission === GUEST_PERMISSION : true).map(item =>
                            <SidebarItem key={item.title} title={item.title} icon={item.icon}
                                         onClick={() => onSidebarItemClick(item.title)}
                                         active={activeItem === item.title}/>)}
                    </ul>
                </>)}
        </div>);
}
export default Sidebar;