import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const NavLinks = ({ toggle }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            end
            onClick={toggle}
          >
            <span className="icon">
              {icon}
              {text}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
