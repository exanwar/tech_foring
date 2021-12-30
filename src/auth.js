import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

class Auth {
  constructor() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  register(
    {
      full_name,
      email,
      birthDate,
      gender,
      phone_number,
      password,
      confirmPassword,
    },
    cb
  ) {
    const data = {
      full_name: full_name,
      email: email,
      birthDate: moment(birthDate).format('YYYY-MM-DD'),
      gender: gender,
      phone_number: phone_number,
      password: password,
    };
    console.log(data);
    if (password === confirmPassword) {
      axios
        .post('https://tf-practical.herokuapp.com/api/register/', data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(({ data }) => {
          Toast.fire({
            icon: 'success',
            title: 'You have been registered successfully!',
          });
          cb();
        })
        .catch((e) => {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        });
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Password didn't match!",
      });
    }
  }

  login(cb, { email, password }) {
    axios
      .post(
        'https://tf-practical.herokuapp.com/api/login/',
        {
          email: email,
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then(({ data }) => {
        MySwal.fire({
          title: 'Congratulations!',
          text: 'You are successfully logged in!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Go to Dashboard',
          allowOutsideClick: false,
        }).then((result) => {
          cb();
        });
        this.authenticated = true;
        localStorage.setItem('access', data.access);
        localStorage.setItem('refresh', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log(data);
      })
      .catch((e) => console.log(e.response));
    this.authenticated = true;
  }

  logout(cb) {
    this.authenticated = false;
    localStorage.clear();
    cb();
  }

  getJobs() {
    const accessToken = localStorage.getItem('access');
    axios
      .get('https://tf-practical.herokuapp.com/api/job_post/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(({ data }) => {
        this.jobs = [{ name: 'hello' }];
      });
  }

  createJob(
    {
      jobTitle,
      lastDateOfApply,
      shift,
      level,
      vacancies,
      location,
      jobType,
      jobDescription,
    },
    cb
  ) {
    const accessToken = localStorage.getItem('access');
    axios
      .post(
        'https://tf-practical.herokuapp.com/api/job_post/',
        {
          jobTitle: jobTitle,
          lastDateOfApply: moment(lastDateOfApply).format('YYYY-MM-DD'),
          shift: shift,
          level: level,
          vacancies: vacancies,
          location: location,
          jobType: jobType,
          jobDescription: jobDescription,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      )
      .then((response) => {
        Toast.fire({
          icon: 'success',
          title: 'A new job has been posted!',
        });
        cb();
      })
      .catch((e) => console.log(e.response));
  }

  deletePost(id) {
    const accessToken = localStorage.getItem('access');
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete('https://tf-practical.herokuapp.com/api/job_update/' + id, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken,
            },
          })
          .then((response) => {
            MySwal.fire('Deleted!', 'Your file has been deleted.', 'success');
          })
          .catch((e) => {
            MySwal.fire('Oppsss!', 'Something went wrong!', 'error');
          });
      }
    });
  }
}

export default new Auth();
