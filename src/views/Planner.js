import React from 'react';
import api from "../api";
import {withRouter} from "react-router-dom";
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Loader from "react-spinners/PulseLoader";

class Planner extends React.Component {
    state = {
        student: '',
        loading: true,
        errorStatus: false,
        errorMessage: '',
    };

    componentDidMount() {
        api.getLessons(this.props.match.params.alias)
            .then(res => {
                const student = res.data;
                const loading = false;

                this.setState({
                    student,
                    loading
                });
            }).catch(error => {
            const errorStatus = true;
            const errorMessage = error.response.data;
            const loading = false;

            this.setState({
                errorStatus,
                errorMessage,
                loading
            });
            return error.response
        });
    }


    render() {
        if (this.state.loading){
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                    <Loader
                        class="loader"
                        size={20}
                        color={"#000000"}
                        loading={this.state.loading}
                    />
                </div>
            )
        }
        else if (!this.state.errorStatus && !this.state.loading) {
            return (
                <div>
                    <div className="px-6 py-3">
                        <div className="text-4xl">Lessons</div>
                        <div className="text-2xl">
                            {this.state.student.first_name} {this.state.student.surname}
                        </div>
                    </div>
                    <div>
                        {(() => {
                            if (this.state.student.lessons.length > 0) {
                                return (
                                    <table className="relative w-full">
                                        <thead>
                                        <tr>
                                            <th className="w-1/4 sticky top-0 px-6 py-3 bg-gray-200 text-left">Date</th>
                                            <th className="w-1/8 sticky top-0 px-6 py-3 bg-gray-200 text-left">Topic</th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                        {this.state.student.lessons.map(lesson =>
                                            <tr>
                                                <td className="px-4 py-2 font-medium">
                                                    {moment(lesson.from).format('dddd, Do MMMM')}
                                                    <div>
                                                        ({moment(lesson.from).format('H:mm')} - {moment(lesson.to).format('H:mm')})
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    <table className="table-fixed w-full">
                                                        <tbody>
                                                        {(() => {
                                                            if (lesson.topics.length > 0) {
                                                                return (
                                                                    <tr>
                                                                        <td className="px-4 py-2 text-gray-600">
                                                                            {lesson.programming_language_framework.name} ({lesson.programming_language_framework.programming_language.name})
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            } else {
                                                                return (
                                                                    <tr>
                                                                        <td className="px-4 py-2 bg-gray-800 text-white">N/A</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        })()}
                                                        {
                                                            lesson.topics.map(topic =>
                                                                (() => {
                                                                    if (topic.completed) {
                                                                        return (
                                                                            <tr>
                                                                                <td className="border-b border-green-500 px-4 py-2 bg-green-300">
                                                                                    {topic.framework_topic.name}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    } else {
                                                                        return (
                                                                            <tr>
                                                                                <td className="border-b border-red-400 px-4 py-2 bg-red-300">
                                                                                    {topic.framework_topic.name}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    }
                                                                })()
                                                            )
                                                        }
                                                        </tbody>
                                                    </table>
                                                </td>

                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                )
                            } else {
                                return (
                                    <div className="flex flex-col">
                                        <div className="px-6 py-3">
                                            <FontAwesomeIcon icon="info-circle" size="4x" color="#4A98FF"/>
                                        </div>
                                        <div className="px-6 py-3">
                                            No lessons available for this student
                                        </div>
                                    </div>
                                )
                            }
                        })()}

                    </div>
                </div>
            )
        } else if (this.state.errorStatus) {
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="px-6 py-3">
                        <FontAwesomeIcon icon="exclamation-circle" size="4x" color="red"/>
                    </div>
                    <div className="px-6 py-3">
                        {this.state.errorMessage}
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(Planner)