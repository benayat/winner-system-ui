import './SidebarItem.css'

const SidebarItem = ({ title, icon, onClick, active }) => {
    return (
        <li className={`sidebar-item ${active&& 'active'}`} onClick={onClick}>
            <span className={"icon-container"}><img className={"icon"} src={icon} alt={title}/> {title}</span>
        </li>
    );
}
export default SidebarItem;