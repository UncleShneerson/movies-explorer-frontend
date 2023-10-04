import './NavBar.scss';
import NavBarItem from './NavBarItem/NavBarItem';

function NavBar({links}) {

  return (
    <div>
      <nav className='navbar'>
        {
          links.map((item) => (
            <NavBarItem title={item.title} link={item.link}/>
          ))
        }
      </nav>
    </div>
  );
}

export default NavBar;
