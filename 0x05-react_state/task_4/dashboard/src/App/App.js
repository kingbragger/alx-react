import React from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import { getLatestNotification } from '../utils/utils';
import { StyleSheet, css} from 'aphrodite';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import { AppContext, user } from './AppContext'

const styles = StyleSheet.create({
  AppBody: {
    fontSize: '1.1rem',
    paddingLeft: 10,
    margin: 0
  },
  wrapper: {
    border: '2px solid #e1484c'
  }
})

// const listNotifications = [
//   { id: 1, value: 'New course available', type: 'default' },
//   { id: 2, value: 'New resume available', type: 'urgent' },
//   { id: 3, html: { __html: getLatestNotification }, type: 'urgent' }
// ]

const listCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 }
];

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      displayDrawer: false,
      user: user,
      listCourses: listCourses,
      listNotifications: [
        { id: 1, value: 'New course available', type: 'default' },
        { id: 2, value: 'New resume available', type: 'urgent' },
        { id: 3, html: { __html: getLatestNotification() }, type: 'urgent' }
      ]
    }
  }

  logOut = () => {
    this.setState({user: user})
  }

  logIn = (email, password) => {
    const currentUser = {email:email, password:password, isLoggedIn: true}
    this.setState({user: currentUser })
  }

  handleDisplayDrawer = () => {
    this.setState({displayDrawer: true})
  }

  handleHideDrawer = () => {
    this.setState({displayDrawer: false})
  }

  componentDidMount() {
    this.alert()
  }

  alert() {
    document.addEventListener('keydown', (e) => {
      // eslint-disable-next-line eqeqeq
      if (e.ctrlKey && e.code =='KeyH'){
        e.preventDefault()
        this.props.logOut()
        alert('Logging you out')
      }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', alert)
  }

  render () {
    const currentUser = this.state.user
    const logOut = this.logOut
    const LoginStatus = () => {
      if (currentUser.isLoggedIn) {
        return (
          <BodySectionWithMarginBottom title="Course List">
            <CourseList listCourses={this.state.listCourses}/>
          </BodySectionWithMarginBottom>
        )
      } else {
        return (
          <BodySectionWithMarginBottom title="Log in to continue">
            <Login logIn={this.logIn}/>
          </BodySectionWithMarginBottom>
        )
    }
    
  }
  return (
    <AppContext.Provider value={{currentUser, logOut}}>
      <Notifications
            listNotifications={this.state.listNotifications}
            displayDrawer={this.state.displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer} handleHideDrawer={this.handleHideDrawer}
          />
      <Header />
      <hr className={css(styles.wrapper)}/>
      <div className={css(styles.AppBody)}>
        {LoginStatus()}
        <BodySection title="News from the School">
          <p>
            News around the school!
            News around the school!
            News around the school!
            News around the school!
            News around the school!
            News around the school!
            News around the school!
            News around the school!
          </p>
        </BodySection>
      </div>
      <Footer />
    </AppContext.Provider>
  );
  }
}
