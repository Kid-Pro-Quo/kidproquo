import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Image, Icon, Button, Feed } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class GroupView extends Component {

    componentDidMount() {
        // this.props.dispatch({ type: 'FETCH_FAMILY', payload: this.props.reduxStore.user.id })
        this.props.dispatch({ type: 'FETCH_GROUP', payload: this.props.reduxStore.userGroups[0]});

    }

    grabName = (object) => {
    console.log(object)
    }
    

    seeCalendar = () => { this.props.history.push('/calendar') }

    render() {
        console.log('family.id:',this.props.reduxStore.family.id)
        console.log('family.id:' + this.props.reduxStore.userGroups)

        
        return (
            <div>
                <h1>
                   Welcome to the {this.props.reduxStore.userGroups && this.props.reduxStore.userGroups.length > 0 ?
                     this.props.reduxStore.userGroups[0].group_name : <p></p>} group!
                </h1>
                <div>
                    <Button.Group size='small'>
                        <Button>EDIT</Button>
                        <Button.Or />
                        <Button>ADD MEMBERS</Button>
                    </Button.Group>
                </div>
                {/* <pre>{JSON.stringify(this.props.reduxStore, null, 2)}</pre> */}
                
                {this.props.reduxStore.group && this.props.reduxStore.group.length > 0 ?
                    this.props.reduxStore.group.map((item) => {
                        if (item.event_claimed === false) {
                       
                        return (
                            <>
                            <Feed>
                        <Feed.Event>
                            <Feed.Label>
                            </Feed.Label>
                            <Feed.Content>
                                <Feed.Label>
                                 <img src='https://www.carters.com/on/demandware.static/-/Sites-Carters-Library/default/dw7a7f95ac/content/carters/images/nav/KG_Fall_2019.jpg' alt="lol" />
                                </Feed.Label>
                                 {item.requester_name} family needs a sitter on {item.event_date} from {item.event_time_start} - {item.event_time_end}. &nbsp;
                                 <></><Button basic color='blue'>
                                    CLAIM
                                </Button>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                            </>
                        )}
                        else {
                            return(
                            <>
                                <Feed>
                                    <Feed.Event>
                                        <Feed.Label>
                                        </Feed.Label>
                                        <Feed.Content>
                                            <Feed.Label>
                                                <img src='https://www.carters.com/on/demandware.static/-/Sites-Carters-Library/default/dw7a7f95ac/content/carters/images/nav/KG_Fall_2019.jpg' alt="lol" />
                                            </Feed.Label>
                                                {item.claimer_name} has agreed to help the {item.requester_name} family on {item.event_date} from {item.event_time_start} - {item.event_time_end}. &nbsp;
                    
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                            </>
                    )}
                    })
                    : <p></p>} 
               
                <div>
                    <Button onClick={(event) => this.seeCalendar()} icon labelPosition='right'>
                        View Calendar
      <Icon name='calendar' />
                    </Button>
                </div>
                
                {this.props.reduxStore.group && this.props.reduxStore.group.length > 0 ?
                    
                    
                    
                        this.props.reduxStore.group.map((item) => {
                            console.log(item)
                            return (
                                <>
                                    <Card key={item.id}>
                                        <Image wrapped size='medium' src={item.image} />
                                    <Card.Content>
                                        <Card.Header>{item.requester_name} Family</Card.Header>
                                    </Card.Content>
                                    </Card>
                                </>

                            )
                        })
                    
                    : <p></p>} 


            </div>
        )
    }
};

const mapReduxStoreToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapReduxStoreToProps)(GroupView);