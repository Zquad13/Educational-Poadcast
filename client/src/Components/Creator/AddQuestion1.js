import React from 'react'

function AddQuestion1() {
  return (
    <div>
        <div className='container mt-5'>
            <label className='ms-4 add-question-label me-2'>4.</label>
            <input type='text'
            className='add-question-text ms-3'
            />
            <div>
                <label className='ms-4 add-question-label me-2 mt-5'>A.</label>
                <input type='text'
                className='add-question-optiontextbox ms-3'
                />
            </div>
            <div>
                <label className='ms-4 add-question-label me-2 mt-5'>B.</label>
                <input type='text'
                className='add-question-optiontextbox ms-3'
                />
            </div>
            <div>
                <label className='ms-4 add-question-label me-2 mt-5'>C.</label>
                <input type='text'
                className='add-question-optiontextbox ms-3'
                />
            </div>
            <div>
                <label className='ms-4 add-question-label me-2 mt-5'>D.</label>
                <input type='text'
                className='add-question-optiontextbox ms-3'
                />
            </div>
            <div className='container mt-5 ms-5 '>
                <select className='add-question-select ps-3' >
                    <option>Answer</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                </select>
            </div>  
        </div>
    </div>
  )
}

export default AddQuestion1
