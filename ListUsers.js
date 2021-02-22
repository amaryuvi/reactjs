import React, {Component} from 'react';

class ListUsers extends Component
{
	constructor()
	{
		super();
		this.state ={
				showGrid: false,
				columnList: [{headerName: "Id", field: "id"}, {headerName: "Email", field: "email"}, {headerName: "First Name", field: "first_name"}, {headerName: "Last Name", field: "last_name"}, {headerName: "Avatar", field: "avatar"}],
				responseData: [],
				tableData: [],
				searchValue: ""
			}	
	}

	componentDidMount() {
		this.getUsers();
	}

	getUsers()
	{
		fetch("https://reqres.in/api/users","Get",{}).then(res => res.json()).then(
		res => {
			this.setState({
				responseData: JSON.parse(JSON.stringify(res.data)),
				tableData: JSON.parse(JSON.stringify(res.data)),
				showGrid: true
				})
			}		
		)
	}

	searchValueChanges(event)
	{
		this.setState({
			searchValue: event.target.value				
		})
	}	

	searchBtnClick(){
        let responseData = this.state.responseData;
        responseData = responseData.filter(
            data =>  data["first_name"].toLowerCase().indexOf(this.state.searchValue.toLowerCase()) != -1 || data["last_name"].toLowerCase().indexOf(this.state.searchValue.toLowerCase()) != -1
            )
            this.setState({
                tableData: responseData
            })
	}

	render(){
		return(
        <div>
			<table>
				<thead>
				{
                this.state.columnList.map((column,index) => 
					{ return {<th key={index}>{column[headerName]}</th>}
                    )
                }	
				</thead>
				<tbody>
					{
                        this.state.showGrid && this.state.tableData.length &&
						this.state.tableData.map((data,index) =>{
							return {<tr key={index}>
							{this.state.columnList.map((column,ind) => 
                                { 
                                    return {column.headerName !== 'Avatar' ? <td key={ind}>{data[column[field]]}</td> : <td key= {ind}><img src={data[column[field]]} /></td>}
                                }
                            )}
                            </tr>  
                        }})
					}
					{this.state.showGrid && !this.state.tableData.length &&
					<tr>No Record(s) Found.</tr>	}
				</tbody>

			</table>

			<div>
				<input type = "text" name="searchText" onChange={e => this.searchValueChange(e)} />
				<button type = "button" onClick={() => this.searchBtnClick}>Search</button> 				
			</div>
		</div>
        )
		}
}

export default ListUsers;
