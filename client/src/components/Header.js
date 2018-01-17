import React, { Component } from 'react';
import '../assets/header.css'
import API from "../utils/API";

class Header extends Component 
{
	state =
	{

	}

	render()
	{
		return(
			<div className="container-fluid header-container">
				<div className="row">
					<div className="col-md-4">
						<div className="logo">
							What Do You Know?
						</div>
					</div>
					<div className="col-md-4 text-center">
						<div className="coins">
							1,345,567
						</div>
					</div>
					<div className="col-md-4">
						<div>

						</div>
					</div>
				</div>
			</div>
			)
	}

}

export default Header;