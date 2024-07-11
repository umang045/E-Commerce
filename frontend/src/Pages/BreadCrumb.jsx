import React from 'react'
import { Link } from 'react-router-dom'

function BreadCrumb(props) {
    const {title} = props;
  return (
    <>
        <div className='breadcrumb py-4'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>
                        <p className='text-center'><Link to='/' className='text-dark'>Home {" "} </Link> / {title}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default BreadCrumb