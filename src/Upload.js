// import React, { Component } from 'react';
// import arweave from './arweave-config';
// import { Redirect } from 'react-dom';

// class UploaderPage extends Component {
//     state = {
//         title: "",
//         description: "",
//         document: null,
//         yesNo: true,
//         owner: true,
//         redirect: false
//     }

//     constructor(prefs) {
//         super(prefs);

//         this.onChange.bind(this);
//     }

//     onChange(event) {
//         const input_type = event.target.type;
//         let value = null;
//         const input_name = event.target.name;

//         switch(input_type) {
//             case 'textarea':
//                 value = event.target.value;
//                 break;
//             case 'radio':
//                 value = event.target.value;
//                 break;
//             case 'checkbox':
//                 if(input_name === 'license') {
//                     if(event.target.checked) {
//                         value = event.target.value;
//                     } else {
//                         value = null;
//                     }
                    
//                 } else {
//                     value = event.target.value === 'on' ? true : false;
//                 }                
//                 break;
//             case 'file':
//                 value = event.target.files[0]
//                 break;
//             default:
//                 value = event.target.value;
//         }
        
//         const state = {};
//         state[input_name] = value;
//         this.setState(state);
//     }

//     async onCreate() {
//       try{
//         if(this.state.title.length === 0) {
//             //this.props.addErrorAlert("Title cannot be empty");
//             return;
//         }

//         if(this.state.description.length === 0) {
//             //this.props.addErrorAlert("Description cannot be empty");
//             return;
//         }

//         if(typeof(this.state.document) === File) {
//             //this.props.addErrorAlert("Please select a file to restore");
//             return;
//         }

//         if(this.state.document.size >= 2000000) {
//             //this.props.addErrorAlert("Sorry, you can only upload files of 2mb or less.");
//             return;
//         }

//         if(this.state.license === null) {
//             this.props.addErrorAlert("You must confirm what license you wish to release your document with.");
//             return;
//         }

//         const that = this;
//         const reader = new FileReader();
//         reader.onload = async function() {
//             const file_data = new Uint8Array(reader.result)

//             let transaction = await arweave.createTransaction({
//                 data: file_data
//             });


//             //transaction.addTag('app', settings.APP_TAG);
//             transaction.addTag('created', new Date().getTime());
//             transaction.addTag('title', that.state.title);
//             transaction.addTag('description', that.state.description);
//             transaction.addTag('filename', that.state.document.name);

//             await arweave.transactions.sign(transaction);
            
//             const response = await arweave.transactions.post(transaction);

//             if(response.status === 200) {
//                 that.props.addSuccessAlert("Your document were successfully saved and will be mined shortly.");

//                 that.addToPendingTransactions(transaction.id);

//                 that.setState({redirect: true});

//             } else if (response.status === 400) {
//                 that.props.addErrorAlert("There was a problem saving your document.");
//                 console.log("Invalid transaction!");
//             } else {
//                 that.props.addErrorAlert("There was a problem saving your document.");
//                 console.log("Fatal error!");
//             }           
            
//         }
//         reader.readAsArrayBuffer(this.state.document);
//       }catch(e){
//         alert(e.message)
//       }
//     }

//     addToPendingTransactions(txid) {
//         let pending_txids = JSON.parse(sessionStorage.getItem('pending_txids'));

//         if(!pending_txids) {
//             pending_txids = [];
//         }

//         pending_txids.push(txid);

//         sessionStorage.removeItem('pending_txids');
//         sessionStorage.setItem('pending_txids', JSON.stringify(pending_txids));
//     }

//     toggleYesNo() {
//         if(this.state.yesNo === true) {
//             this.setState({yesNo: false});
//         } else {
//             this.setState({yesNo: true});
//         }
//     }

//     openFileDialog(e) {
//         this.refs.filename.click();
//     }

//     render() {
//         if(this.state.redirect) {
//             return <Redirect to="/documents" />;
//         }

//         const yesNoChecked = this.state.yesNo === true ? "'checked'" : "";
//         const charCount = 1024 - this.state.description.length;

//         const filename = this.state.document ? this.state.document.name : "";

//         let upload_form = (<div className="uploadForm">
//             <div className="margin-top-10">
//                 <input type="text" onChange={(e) => this.onChange(e)} name='title' className="form-control title" placeholder="Title" />
//             </div>
//             <div className="margin-top-10">
//                 <input type="text" onChange={(e) => this.onChange(e)} name='authors' className="form-control author" placeholder="Authors" />
//             </div>
//             <div className="margin-top-10">
//                 <textarea type="text" onChange={(e) => this.onChange(e)} name='abstract' className="form-control word-count"  placeholder="Abstract"></textarea>
//                 <div className="margin-top-10"></div>
//             </div>
//             <div className="margin-top-10">
//                 <div className="input-group">
//                     <span className="input-group-addon"><i className="fa fa-paperclip" onClick={(e) => this.openFileDialog(e)}></i></span>
//                     <input className="custom-file-upload custom-file-upload-hidden" 
//                         ref="filename"
//                         type="file" id="document" name="document" tabIndex="-1" 
//                         accept=".doc,.docx,.pdf"
//                         style={{position: "absolute", left: "-9999px"}}
//                         onChange={(e) => this.onChange(e)}
//                          />
//                     <input type="text" className="form-control file-upload-input text-left" onClick={(e) => this.openFileDialog(e)} value={filename}/>
//                         <span className="input-group-btn" tabIndex="-1">
//                             <button type="button" className="file-upload-button btn btn-primary" onClick={(e) => this.openFileDialog(e)}>Select a File</button>
//                         </span>
//                 </div>
//             </div>
//             <div className="fancy-form margin-top-20">
//                 <label className="switch switch switch-round switch-success">
//                     <input type="checkbox" name="owner" checked={yesNoChecked} onChange={(e) => this.onChange(e)} onClick={this.toggleYesNo.bind(this)}/>
//                     <span className="switch-label" data-on="YES" data-off="NO"></span>
//                     <span> Are you the author of this document?</span>
//                 </label>
//             </div>
//             <p>Please select a license to release this document with:</p>
//         </div>);

//         let license_options = (<>
//             <label className="checkbox">
//                 <input type="checkbox" name="license" onChange={(e) => this.onChange(e)} value="CC BY-NC 4.0"/>
//                 <i></i> Agree to Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">...Details</a>
//             </label>
//         </>);

//         if(this.state.yesNo === false) {
//             let cc_checked = "'checked'";
//             let oa_checked = "'checked'";

//             if(this.state.license === "Creative Commons") {
//                 oa_checked = "";
//             } else if (this.state.license === "Open access") {
//                 cc_checked = "";
//             } else {
//                 oa_checked = "";
//                 cc_checked = "";
//             }

//             license_options = (<>
//                 <fieldset> 
                
//                 <label className="checkbox">
//                     <input type="checkbox" name="license" id="license" onChange={(e) => this.onChange(e)} value="Creative Commons" checked={cc_checked} />
//                     <i></i> Creative Commons license <a href="https://creativecommons.org/licenses/" target="_blank">...Details</a>
//                 </label>
//                 <label className="checkbox">
//                     <input type="checkbox" name="license" id="license" onChange={(e) => this.onChange(e)} value="Open access"  checked={oa_checked} />
//                     <i></i> Agree to Open access <a href="https://en.wikipedia.org/wiki/Open_access" target="_blank">...Details</a>
//                 </label>
//                 </fieldset>
//             </>);
//         }
        
//         return ( <>
//             <header id="page-header">
//             </header>
//             {/* <div className="col-md-6 padding-20">
//                 <section className="panel panel-default">
//                     <header className="panel-heading">
//                         <h2 className="panel-title elipsis">
//                             <i className="fa fa-cloud-upload"></i> Upload Document
//                         </h2>
//                     </header>
//                     <div className="panel-body noradius padding-10">
//                             {/* <form> */}
//                             {/* {upload_form}
//                             {license_options} */}
//                             {/* </form> */}
                            
//                             <input className="custom-file-upload custom-file-upload-hidden" 
//                         ref="filename"
//                         type="file" id="document" name="document" tabIndex="-1" 
//                         accept=".doc,.docx,.pdf"
//                         style={{position: "absolute", left: "-9999px"}}
//                         onChange={(e) => this.onChange(e)}
//                          />
//                             <button className="uploadArweave" onClick={() => this.onCreate()}>Upload Document</button> 
//                     {/* </div>
//                 </section>
//             </div> */} 
            
//         </>);
//     }
// }

// export default UploaderPage;



import React, { Component } from 'react';
import arweave from './arweave-config';

class UploaderPage extends Component {
    state = {
        title: "",
        description: "",
        document: null,
        yesNo: true,
        owner: true,
        redirect: false
    }

    constructor(prefs) {
        super(prefs);

        this.onChange.bind(this);
    }

    onChange(event) {
        const input_type = event.target.type;
        let value = null;
        const input_name = event.target.name;

        switch(input_type) {
            case 'textarea':
                value = event.target.value;
                break;
            case 'radio':
                value = event.target.value;
                break;
            case 'checkbox':
                if(input_name === 'license') {
                    if(event.target.checked) {
                        value = event.target.value;
                    } else {
                        value = null;
                    }
                    
                } else {
                    value = event.target.value === 'on' ? true : false;
                }                
                break;
            case 'file':
                value = event.target.files[0]
                break;
            default:
                value = event.target.value;
        }
        
        const state = {};
        state[input_name] = value;
        this.setState(state);
    }

    async onCreate() {
        let key = await arweave.wallets.generate();
        console.log("key:", key)
        if(this.state.title.length === 0) {
           // this.props.addErrorAlert("Title cannot be empty");
            return;
        }

        // if(this.state.description.length === 0) {
        //     //this.props.addErrorAlert("Description cannot be empty");
        //     return;
        // }

        // if(typeof(this.state.document) === File) {
        //    // this.props.addErrorAlert("Please select a file to restore");
        //     return;
        // }

        // if(this.state.document.size >= 2000000) {
        //     //this.props.addErrorAlert("Sorry, you can only upload files of 2mb or less.");
        //     return;
        // }

        // if(this.state.license === null) {
        //     //this.props.addErrorAlert("You must confirm what license you wish to release your document with.");
        //     return;
        // }

        const that = this;
        const reader = new FileReader();
        reader.onload = async function() {
            const file_data = new Uint8Array(reader.result)
            console.log("file_data", file_data)

            let transaction = await arweave.createTransaction({
                data: file_data
            }, key);
            console.log("transaction", transaction)

            // transaction.addTag('app', settings.APP_TAG);
            transaction.addTag('created', new Date().getTime());
            transaction.addTag('title', that.state.title);
            transaction.addTag('description', that.state.description);
            transaction.addTag('filename', that.state.document.name);
            console.log("props", this.props)

            await arweave.transactions.sign(transaction, key);
            
            const response = await arweave.transactions.post(transaction);

            if(response.status === 200) {
                alert('Your document has been uploaded and will be mined shortly!')
                // that.props.addSuccessAlert("Your document were successfully saved and will be mined shortly.");

                // that.addToPendingTransactions(transaction.id);

                // that.setState({redirect: true});
                console.log('wworking');

            } else if (response.status === 400) {
                // that.props.addErrorAlert("There was a problem saving your document.");
                console.log("Invalid transaction!");
            } else {
                // that.props.addErrorAlert("There was a problem saving your document.");
                console.log("Fatal error!");
            }           
            
        }
        reader.readAsArrayBuffer(this.state.document);
    }

    addToPendingTransactions(txid) {
        let pending_txids = JSON.parse(sessionStorage.getItem('pending_txids'));

        if(!pending_txids) {
            pending_txids = [];
        }

        pending_txids.push(txid);

        sessionStorage.removeItem('pending_txids');
        sessionStorage.setItem('pending_txids', JSON.stringify(pending_txids));
    }

    toggleYesNo() {
        if(this.state.yesNo === true) {
            this.setState({yesNo: false});
        } else {
            this.setState({yesNo: true});
        }
    }

    openFileDialog(e) {
        this.refs.filename.click();
    }

    render() {
        if(this.state.redirect) {
            // return <Redirect to="/documents" />;
        }

        const yesNoChecked = this.state.yesNo === true ? "'checked'" : "";
        const charCount = 1024 - this.state.description.length;

        const filename = this.state.document ? this.state.document.name : ""; 

        // let upload_form = (<>
        //     <div className="margin-top-10">
        //         <input type="text" onChange={(e) => this.onChange(e)} name='title' className="form-control" placeholder="Title" />
        //     </div>
        //     <div className="margin-top-10">
        //         <textarea type="text" onChange={(e) => this.onChange(e)} name='description' className="form-control word-count"  placeholder="Description"></textarea>
        //         <div className="margin-top-10">Chars {charCount} of 1024 allowed</div>
        //     </div>
        //     <div className="margin-top-10">
        //         <div className="input-group">
        //             <span className="input-group-addon"><i className="fa fa-paperclip" onClick={(e) => this.openFileDialog(e)}></i></span>
        //             <input className="custom-file-upload custom-file-upload-hidden" 
        //                 ref="filename"
        //                 type="file" id="document" name="document" tabIndex="-1" 
        //                 accept=".doc,.docx,.pdf"
        //                 style={{position: "absolute", left: "-9999px"}}
        //                 onChange={(e) => this.onChange(e)}
        //                  />
        //             <input type="text" className="form-control file-upload-input text-left" onClick={(e) => this.openFileDialog(e)} value={filename}/>
        //                 <span className="input-group-btn" tabIndex="-1">
        //                     <button type="button" className="file-upload-button btn btn-primary" onClick={(e) => this.openFileDialog(e)}>Select a File</button>
        //                 </span>
        //         </div>
        //     </div>
        //     <div className="fancy-form margin-top-20">
        //         <label className="switch switch switch-round switch-success">
        //             <input type="checkbox" name="owner" checked={yesNoChecked} onChange={(e) => this.onChange(e)} onClick={this.toggleYesNo.bind(this)}/>
        //             <span className="switch-label" data-on="YES" data-off="NO"></span>
        //             <span> Are you the author of this document?</span>
        //         </label>
        //     </div>
        //     <p>Please select a license to release this document with:</p>
        // </>);

        // let license_options = (<>
        //     <label className="checkbox">
        //         <input type="checkbox" name="license" onChange={(e) => this.onChange(e)} value="CC BY-NC 4.0"/>
        //         <i></i> Agree to Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">...Details</a>
        //     </label>
        // </>);
       


                let upload_form = (<div className="uploadForm">
            <div className="margin-top-10">
                <input type="text" onChange={(e) => this.onChange(e)} name='title' className="form-control title" placeholder="Title" />
            </div>
            <div className="margin-top-10">
                <input type="text" onChange={(e) => this.onChange(e)} name='authors' className="form-control author" placeholder="Authors" />
            </div>
            <div className="margin-top-10">
                <textarea type="text" onChange={(e) => this.onChange(e)} name='abstract' className="form-control word-count"  placeholder="Abstract"></textarea>
                <div className="margin-top-10"></div>
            </div>
            <div className="margin-top-10">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-paperclip" onClick={(e) => this.openFileDialog(e)}></i></span>
                    <input className="custom-file-upload custom-file-upload-hidden" 
                        ref="filename"
                        type="file" id="document" name="document" tabIndex="-1" 
                        accept=".doc,.docx,.pdf"
                        style={{position: "absolute", left: "-9999px"}}
                        onChange={(e) => this.onChange(e)}
                         />
                    <input type="text" className="form-control file-upload-input text-left" onClick={(e) => this.openFileDialog(e)} value={filename}/>
                        <span className="input-group-btn" tabIndex="-1">
                            <button type="button" className="file-upload-button btn btn-primary" onClick={(e) => this.openFileDialog(e)}>Select a File</button>
                        </span>
                </div>
            </div>
            <div className="fancy-form margin-top-20">
                <label className="switch switch switch-round switch-success">
                    <input type="checkbox" name="owner" checked={yesNoChecked} onChange={(e) => this.onChange(e)} onClick={this.toggleYesNo.bind(this)}/>
                    <span className="switch-label" data-on="YES" data-off="NO"></span>
                    <span></span>
                </label>
            </div>
            <p>Please select a license to release this document with:</p>
        </div>);

        let license_options = (<>
            <label className="checkbox">
                <input type="checkbox" name="license" onChange={(e) => this.onChange(e)} value="CC BY-NC 4.0"/>
                <i></i> Agree to Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">...Details</a>
            </label>
        </>);


        

        if(this.state.yesNo === false) {
            let cc_checked = "'checked'";
            let oa_checked = "'checked'";

            if(this.state.license === "Creative Commons") {
                oa_checked = "";
            } else if (this.state.license === "Open access") {
                cc_checked = "";
            } else {
                oa_checked = "";
                cc_checked = "";
            }

            license_options = (<>
                <fieldset> 
                
                <label className="checkbox">
                    <input type="checkbox" name="license" id="license" onChange={(e) => this.onChange(e)} value="Creative Commons" checked={cc_checked} />
                    <i></i> Creative Commons license <a href="https://creativecommons.org/licenses/" target="_blank">...Details</a>
                </label>
                <label className="checkbox">
                    <input type="checkbox" name="license" id="license" onChange={(e) => this.onChange(e)} value="Open access"  checked={oa_checked} />
                    <i></i> Agree to Open access <a href="https://en.wikipedia.org/wiki/Open_access" target="_blank">...Details</a>
                </label>
                </fieldset>
            </>);
        }
        
        return ( <>
            <header id="page-header">
            </header>
            <div className="col-md-6 padding-20">
                <section className="panel panel-default">
                    <header className="panel-heading">
                        <h2 className="panel-title elipsis">
                            <i className="fa fa-cloud-upload"></i> Upload Publications
                        </h2>
                    </header>
                    <div className="panel-body noradius padding-10">
                            <form>
                            {upload_form}
                            {license_options}
                            </form>
                            <button className="uploadArweave" onClick={this.onCreate.bind(this)}>Upload Document</button>
                    </div>
                </section>
            </div>
            
        </>);
    }
}

export default UploaderPage;

