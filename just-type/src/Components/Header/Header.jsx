import { FaGear } from 'react-icons/fa6';

import './Header.css';

export default function Header({ setShowSettings, showSettings }){
	return (
		<div className='header'>
			<h2>Just Type!</h2>
			<div className='row'>
				<div className='buttons'>
					<FaGear onClick={(e) => setShowSettings(!showSettings)}/>
				</div>
			</div>
		</div>
	)
}