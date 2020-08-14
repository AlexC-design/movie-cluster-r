import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWM0ZTMzMjFjZmNmNmY1ZjU3NTdjYjg4NTk5MTQ5ZSIsInN1YiI6IjVkZTQwYTcyMTEzODZjMDAxMTRmNjVkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._kr_8CYvcqsLAD4H9axipbXBcarRGPWNRAP3ySqSpCQ"
  }
});
