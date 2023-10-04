import './NavBar.scss';
import NavBarItem from './NavBarItem/NavBarItem';

function NavBar({links}) {

  return (
      <section>
        <nav className='navbar'>
        {
          links.map((item) => (
            <NavBarItem title={item.title} link={item.link}/>
          ))
        }
      </nav>
      </section>
  );
}

export default NavBar;
