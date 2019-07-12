import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Container} from '@material-ui/core';
import Axios from 'axios';
import {DeleteSharp, Edit} from '@material-ui/icons';
import {Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Label, Input} from 'reactstrap'
import {connect} from 'react-redux'
import Errorpage from './../pages/errorpage'


class ManageMovie extends React.Component{
    state= {
        data : [],
        openModal :false,
        selectedEdit : 0,
        modalEdit : false,
        expandedText : ''
    }


    componentDidMount(){
        Axios.get('http://localhost:2000/movies')
        .then((res)=> {
            this.setState({data : res.data})
        })
        .catch((err)=> {

        })
    }

    getModalValue = () => {
        var jam= [9, 14, 16, 20, 22]
        var playingAt = []
        // if(this.refs.pagi.refs.innerPagi.checked === true){
        //     playingAt.push(9)
        // }if(this.refs.siang.refs.innerSiang.checked === true){
        //     playingAt.push(14)
        // }if(this.refs.sore.refs.innerSore.checked === true){
        //     playingAt.push(16)
        // }if(this.refs.malam.refs.innerMalam.checked === true){
        //     playingAt.push(20)
        // }if(this.refs.midnight.refs.innerMidnight.checked === true){
        //     playingAt.push(22)
        // }

        for(var i =1; i<=5; i++){
            if(this.refs['radio' + i].refs['radio' + i + 'Inner'].checked === true){
                playingAt.push(jam[i-1])
            }
        }

            
        var title = this.refs.title.value
        var sutradara = this.refs.sutradara.value
        var image = this.refs.image.value
        var genre = this.refs.genre.value
        var duration = this.refs.duration.value
        var sinopsis = this.refs.sinopsis.value

        var data = {
            title,
            genre,
            sinopsis,
            playingAt,
            duration,
            sutradara,
            image,
        }
        if(title !== '' && 
        sutradara !== '' && 
        genre !== '' && 
        playingAt.length > 0 && 
        sinopsis !== '' && 
        duration !== '' && 
        image !== ''){

                    Axios.post('http://localhost:2000/movies', data)
                    .then((res)=> {
                        alert('add movie success')
                        var movieData = this.state.data
                        movieData.push(res.data)
                        this.setState({data : movieData, openModal : false});
                    })
                    .catch((err)=>{
                        console.log(err);
                        
                    })
                }else{
                    alert('semua form wajib diisi')
                }
        }

        onEditButton = (id) => {
            this.setState({selectedEdit : id})
        }

        onSaveEditBtn = (id) => {
            var title = this.refs.input1.value
            var sutradara = this.refs.input2.value
            var image = this.refs.input3.value
            var genre = this.refs.input4.value
            var playingAt = this.refs.input5.value.split(',')
            var duration = this.refs.input6.value
            var sinopsis = this.refs.input7.value
            

            if(title === '' || 
               sutradara === '' || 
               image === '' || 
               genre === '' || 
               playingAt.length <= 0 ||
               duration <= 0 ||
               sinopsis ==='')
               {
                   alert('Isi Form Dengan Benar')
               }
            else{
                var data = {
                    title, sutradara,image,genre,playingAt,duration,sinopsis
                }
                Axios.patch('http://localhost:2000/movies/' + this.state.selectedEdit , data )
                .then((res)=>{
                    var newData = this.state.data
                    newData[id] = res.data
                    this.setState({data : newData, selectedEdit : null}) 
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }

        onDeleteButton = (id, index) => {
            var concern = window.confirm('Are You Sure?')
            if(concern === true){
                Axios.delete('http://localhost:2000/movies/' + id)
                .then((res) => {
                    alert('Delete data success')
                    var movieData = this.state.data
                    movieData.splice(index, 1)
                    this.setState({data : movieData})
                })
                .catch((err) => {

                })
            }
        }
    

    cutSynopsis = (text) => {
        var arr = text.split(' ')
        var newArr = []
        for(var i = 0; i<5; i++){
            newArr.push(arr[i])
        }
        return newArr.join(' ')
    }

    showSynopsis = () => {
        this.setState({expandedText : !this.state.expandedText})
    }

    continuedSynopsis = (text) => {
        var arr = text.split(' ')
        var newArr = []
        for(var i = 5; i<arr.length; i++){
            newArr.push(arr[i])
        }
        return newArr.join(' ')
    }
 

    closeModal = () => {
        this.setState({openModal : false})
    }
    

    renderTable = () => {
        var jsx = this.state.data.map((val, index)=> {
            if(val.id === this.state.selectedEdit){
                return(
                            <TableRow>
                                <TableCell>{val.id}</TableCell>
                                <TableCell><input ref='input1' type='text' className='form-control' defaultValue={val.title}/></TableCell>
                                <TableCell><input ref='input2' type='text' className='form-control' defaultValue={val.sutradara}/></TableCell>
                                <TableCell><input ref='input3' type='text' className='form-control' defaultValue={val.image}/></TableCell>
                                <TableCell><input ref='input4' type='text' className='form-control' defaultValue={val.genre}/></TableCell>
                                <TableCell><input ref='input5' type='text' className='form-control' defaultValue={val.playingAt}/></TableCell>
                                <TableCell><input ref='input6' type='text' className='form-control' defaultValue={val.duration}/></TableCell> 
                                <TableCell><input ref='input7' type='text' className='form-control' defaultValue={val.sinopsis}/></TableCell>
                                <TableCell><input type='button' className='btn btn-danger' onClick={() => this.setState({selectedEdit : null})} value='cancel'/> </TableCell>
                                <TableCell><input type='button' className='btn btn-success' onClick={() => this.onSaveEditBtn(index)} value='save'/></TableCell>
                            </TableRow>
                )
            }
            return(
                            <TableRow>
                                <TableCell>{val.id}</TableCell>
                                <TableCell>{val.title}</TableCell>
                                <TableCell>{val.sutradara}</TableCell>
                                <TableCell><img src={val.image} alt={val.title} height='150px'></img></TableCell>
                                <TableCell>{val.genre}</TableCell>
                                <TableCell>{val.playingAt.join(',')}</TableCell>
                                <TableCell>{val.duration}</TableCell> 
                                <TableCell>
                                    <span> {this.cutSynopsis(val.sinopsis)} </span>
                                    <span ref='more' onClick={this.showSynopsis} 
                                    style={{textDecoration: 'underline', color : 'red', cursor : 'pointer'}}>read more. . .  </span> 
                                    {this.state.expandedText === '' ? null : this.continuedSynopsis(val.sinopsis)}
                                </TableCell>
                                <TableCell> <Edit onClick={() => this.onEditButton(val.id, index)} /> </TableCell>
                                <TableCell><DeleteSharp onClick={() => this.onDeleteButton(val.id, index)} /></TableCell>
                            </TableRow>
            )
        })
        return jsx
    }

    render(){
        if(this.props.user !== 'irwan'){
            return(
                <Errorpage />
            )
        }

        return(
            <Container fixed>
                <h1>Manage Movies Page</h1>
                <input type='button' className='btn btn-success mb-3' value='+' onClick={()=> this.setState({openModal : true})} />
                {/* modal start */}
                    <Modal isOpen={this.state.openModal} toggle={this.closeModal}>
                        <ModalHeader>

                        </ModalHeader>
                        <ModalBody>
                            <input ref='title' type='text' className='form-control mt-2' placeholder='Title'/>
                            <input ref='sutradara' type='text' className='form-control mt-2' placeholder='Sutradara'/>
                            <input ref='image' type='text' className='form-control mt-2' placeholder='Image'/>
                            <input ref='genre' type='text' className='form-control mt-2' placeholder='Genre'/>
                            
                            <div className='mt-2'>

                            <FormGroup check inline>
                                <Label>
                                    Playing at :
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio1' innerRef='radio1Inner' type='radio' /> 09.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio2' innerRef='radio2Inner' type='radio' /> 14.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio3' innerRef='radio3Inner' type='radio' /> 16.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio4' innerRef='radio4Inner' type='radio' /> 20.00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input ref='radio5' innerRef='radio5Inner' type='radio' /> 22.00
                                </Label>
                            </FormGroup>
                            </div>
                            <input ref='duration' type='number' className='form-control mt-2' placeholder='Duration'/>
                            <textarea ref='sinopsis' placeholder='synopsis' className='form-control mt-2'/>
                        </ModalBody>
                        <ModalFooter>
                        <input type='button' className='btn btn-primary' onClick={this.getModalValue} value='Add Movie'/>
                        <input type='button' className='btn btn-danger' value='Cancel' onClick={()=> this.closeModal()} />
                        </ModalFooter>
                    </Modal>
                {/* modal end */}
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell>No.</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Director</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Playing at</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Synopsis</TableCell>
                            <TableCell>Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.renderTable()}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user : state.user.username
    }
}

export default connect(mapStateToProps) (ManageMovie);