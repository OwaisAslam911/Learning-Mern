import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
   <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
  <div class="container-fluid">
    <Link class="navbar-brand" to={'/'}>Crud App</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to={'/'}>Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={'/addProduct'}>Add Product</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={'/updateProduct'}>Update Product</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to={'/deleteProduct'}>Delete Product</Link>
        </li>
       
        
      </ul>
      
    </div>
  </div>
</nav>
  )
}

export default Navbar