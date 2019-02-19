import React from 'react';

function Categories (props) {

    function rederCategory (key)
    {
        return (
            <div className="display-inline">
                {props.statusCategory[key.category] !== undefined ?
                (
                <button   className="buttonFormat" key={key.category} > 
                    {key.category}
                    <p>
                        <strong>{props.statusCategory[key.category].correct}</strong> - Correct
                    </p>
                    <p>
                        <strong>{props.statusCategory[key.category].incorrect}</strong> - Incorret
                    </p>
                </button>
                )
                :
                (
                <button className="buttonFormat" key={key.category} onClick={ () => props.onCategorySelected (key.category)} > 
                    {key.category}
                   
                </button>  
                )
                }

            </div>
          
        )
    }

    return (
            <div  className="answerOptions ">
                {props.categories.map(rederCategory)}
            </div>
        )
}

export default Categories;