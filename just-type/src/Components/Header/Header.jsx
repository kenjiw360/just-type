import { FaGear } from 'react-icons/fa6';

import './Header.css';

export default function Header({ revealDropdown }){
	return (
		<div className='header'>
			<h2>Just Type!</h2>
			<div className='row'>
				<div className='buttons'>
					<FaGear onClick={(e) => revealDropdown(true)}/>
				</div>
			</div>
		</div>
	)
}