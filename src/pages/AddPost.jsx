import React from 'react'
import { Container, PostForm , UploadPost } from '../components'

function AddPost() {
  return (
    <div className='py-5 p-3'>
        <Container>
            {/* <PostForm /> */}
            <UploadPost/>
        </Container>
    </div>
  )
}

export default AddPost