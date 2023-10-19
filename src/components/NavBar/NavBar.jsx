import './NavBar.scss';
import NavBarItem from './NavBarItem/NavBarItem';

function NavBar({links}) {

  return (
    <div>
      <nav className='navbar'>
        {
          links.map((item) => (
            <NavBarItem title={item.title} link={item.link} key={item.title}/>
          ))
        }
      </nav>
    </div>
  );
}

export default NavBar;
