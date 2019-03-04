import React from 'react';

class App extends React.Component {
   constructor(props)
   {
      super(props);
      this.state = {
         page : "First",
         data : []
      };
      this.changeList = this.changeList.bind(this);
   }

   enterDataToDirectory(userdata)
   {
      this.state.data.push(userdata); 
      
   }

   changePage()
   {
      if(this.state.page == 'First')
         this.setState({
            page : "Second",
         });
      else 
         this.setState({
            page : "First",
         });
   }

   changeList(ele)
   {
      //console.log(ele);
      var a = this.state.data;
      //var b = [];
      //console.log(a.length);

      this.setState({
         data : []
      });
      //console.log(ele);

      a.map(function(a, i){
         if(i!=ele)
            this.state.data.push(a[i]);
      })
      //console.log(b);
      //console.log(this.state.data);
   }

   handlePage()
   {
      if(this.state.page == 'First')
         return (
            <div>
               <Header />
               <CHANGEPAGE name="ADD NEW CONTACT" page={this.changePage.bind(this)}/>
               <SHOWALLINDIRECTORY data={this.state.data} del={this.changeList.bind(this)} />
            </div>
         );
      else if(this.state.page == 'Second')
      return (
         <div>
            <Header />
            <CHANGEPAGE name="BACK" page={this.changePage.bind(this)}/>
            <TAKEDATAINDIRECTORY data={this.enterDataToDirectory.bind(this)}/>
         </div>
      );
   }

   render() {
      return (
         <div>
            {this.handlePage()}
         </div>
      );
   }
}

class Header extends React.Component{
   render()
   {
      return(
         <div>
            PHONE DIRECTORY
         </div>
      );
   }
}

class SHOWALLINDIRECTORY extends React.Component{
 
   render()
   {
      var de = this.props.del;
      var i=-1;
      var userdetail = this.props.data.map(function(contact) { 
         i++;
         return(
             <TROW num={i} name={contact.name} del={de} number={contact.number} />
         )
     });
       
      var tb="width:100%; fontSize:15px;";
      return(

         <div>
            <table style={this.props.tb}>
               <thead>
                  <tr>
                     <th>Name</th> 
                     <th>Number</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody>
                  {userdetail}
               </tbody>
            </table>
         </div>
      );
   }
}

class TAKEDATAINDIRECTORY extends React.Component{

   constructor(props){
      super(props);

      this.state = {
         name: '',
         number:''
      };

      this.changeName = this.changeName.bind(this);
      this.changeNumber = this.changeNumber.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   changeName(e)
   {
     this.setState({
        name : e.target.value,
     });
   }
   changeNumber(e)
   {
      this.setState({
         number : e.target.value,
      });
   }
   handleSubmit(e){
       e.preventDefault();
      var d = {
         name: this.state.name, 
         number : this.state.number
      };

      this.props.data(d);
   }
   render()
   {
      var show ="fontSize:10px;";
      return(
         <div>
           <form onSubmit={this.handleSubmit} >
              Username : <input placeholder="Username" onChange={this.changeName} type="text" /> <br />
              Phone : <input placeholder="XXXXXXXXXX" onChange={this.changeNumber} type="text" /> <br />
              <br /><br />
              <span style={this.props.show}>
                 Enter data is: <br />
                 Name: <span>{this.state.name}</span><br />
                 Number: <span >{this.state.number}</span><br />
              </span>
              <button type='submit' >Add Contact</button>
           </form>
         </div>
      );
   }
}

class CHANGEPAGE extends React.Component{
   render()
   {
      return(
         <div>
           <button onClick={() => this.props.page()}>{this.props.name}</button>
         </div>
      );
   }
}

class TROW extends React.Component{

   constructor(props){
      super(props);

      this.deleteContact = this.deleteContact.bind(this);
   }

   deleteContact(e)
   {
      //console.log(e.target.value);
      return this.props.del(e.target.value);
   }
   render()
   { 
      return(
         <tr>
            <td>{this.props.name}</td>
            <td>{this.props.number}</td>
            <td><button value={this.props.num} onClick={this.deleteContact}>Delete</button></td>
         </tr>
      );
   }
}

export default App;