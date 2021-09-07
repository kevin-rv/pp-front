import planningApi from "../../src/api/planningApi"
// import { shallowMount } from '@vue/test-utils'
import {expect}  from 'chai';
let faker = require('faker')
faker.locale = "fr"
// import axios from 'axios'
// axios.defaults.adapter = require('axios/lib/adapters/http');
import moment from 'moment'
describe('Planning Api', () => {

    // const validEmail = 'email_3@email.com'
    const validPassword = 'password'
    //
    // const randomEmail = faker.internet.email(faker.lorem.word(), faker.lorem.word(),  faker.lorem.word() + '.' +  faker.lorem.word())
    // const randomName = faker.name.findName()
    // const randomPhone = faker.phone.phoneNumber()

    async function token(email)
    {
        const token = await planningApi.login(email, validPassword)

        return planningApi.setToken(token)
    }


    it('connect with bad credentials return error', function () {
        let message = ''
        return planningApi.login('bad-email', 'bad-password').catch(reason => {
            message = reason.message
        }).finally(() => {
            expect(message).equal('Bad credentials')
        })
    });

    let currentUserEmail;

    it('create one user', function () {
        currentUserEmail = faker.internet.email()
        const randomName = faker.name.findName()
        const birthday = moment(faker.datatype.datetime()).format('YYYY-MM-DD')
        return planningApi.createOneUser(randomName, currentUserEmail, validPassword, validPassword, birthday).then(
            (data) => {
                return expect(data).to.be.eql({
                    email: currentUserEmail,
                    phoneNumber: null,
                    birthday: birthday,
                    home: null,
                    work: null,
                    name: randomName,
                });
            })
    });

    it('connect with valid credentials return token', function () {
        return planningApi.login(currentUserEmail, validPassword).then(
            (token) => {
                expect(token).to.match(/[a-zA-Z0-9_.]+/)
            }
        )
    });

    it('create one user with bad birthday fail', function () {
        let message = ''
        return planningApi.createOneUser('bob', currentUserEmail, validPassword, validPassword, 'bad-birthday').catch(reason => {
            message = reason.message
        }).finally(() => {
            expect(message).equal('birthday MUST to be in format yyyy-mm-dd')
        })
    });

    it('create one user not email format', function () {
        let message = ''
        return planningApi.createOneUser('bob', 'bad_email_format', validPassword, validPassword, '1900-05-21').catch(reason => {
            message = reason.message
        }).finally(() => {
            expect(message).equal('email MUST to be a valid email')
        })
    });

    it('create one user email duplicated', function () {
        let message = ''
        return planningApi.createOneUser('bob', currentUserEmail, validPassword, validPassword, '1900-05-21').catch(reason => {
            message = reason.message
        }).finally(() => {
            expect(message).contain('Duplicate')
        })
    });

    it('update one user', function () {
        return token(currentUserEmail).then(planningApi => {
            currentUserEmail = faker.internet.email()
            const randomName = faker.name.findName()
            const randomPhone = faker.phone.phoneNumber()
            const birthday = moment(faker.datatype.datetime()).format('YYYY-MM-DD')
            const home = 'maison'
            const work = faker.name.jobTitle()
            return planningApi.updateUser(randomName, currentUserEmail, birthday, randomPhone , home, work).then(
                (data) => {
                    expect(data).to.be.eql({
                        email: currentUserEmail,
                        phoneNumber: randomPhone,
                        birthday: birthday,
                        home: home,
                        work: work,
                        name: randomName,
                    });
                })
        })
    });

    let createdPlanningId;
    let planningName;
    it('create one planning', function () {
        return token(currentUserEmail).then(planningApi => {
            const randomName = faker.name.findName()
            return planningApi.createOnePlanning(randomName).then((data) => {
                createdPlanningId = data.id
                planningName = data.name
                expect(data).to.be.eql({
                    id: data.id,
                    name: randomName
                });
            })
        })
    });

    it('create planning fail duplicate name', function () {
        return token(currentUserEmail).then(planningApi => {
            let message = ''
            return planningApi.createOnePlanning(planningName).catch(reason => {
                message = reason.message
            }).finally(() => {
                expect(message).equal('name already exist')
            })
        })
    });

    it('create planning fail not be empty', function () {
        return token(currentUserEmail).then(planningApi => {
            let message = ''
            return planningApi.createOnePlanning('').catch(reason => {
                message = reason.message
            }).finally(() => {
                expect(message).equal('name MUST NOT be empty')
            })
        })
    });

    it('update planning fail duplicate name', function () {
        return token(currentUserEmail).then(planningApi => {
            let message = ''
            return planningApi.updatePlanning(createdPlanningId ,planningName).catch(reason => {
                message = reason.message
            }).finally(() => {
                expect(message).equal('name already exist')
            })
        })
    });

    it('update planning fail not be empty', function () {
        return token(currentUserEmail).then(planningApi => {
            let message = ''
            return planningApi.updatePlanning(createdPlanningId ,'').catch(reason => {
                message = reason.message
            }).finally(() => {
                expect(message).equal('name MUST NOT be empty')
            })
        })
    });


    it('update one Planning', function () {
        return token(currentUserEmail).then(planningApi => {
            const randomName = faker.name.findName()
            return planningApi.updatePlanning(createdPlanningId, randomName).then((data) => {
                expect(data).to.be.eql({
                    id: createdPlanningId,
                    name: randomName,
                });
            })
        })
    });


    let createdContactId;
    it('create one contact', function () {
        return token(currentUserEmail).then(planningApi => {
            const contact = {
                name : faker.name.findName(),
                phoneNumber: faker.phone.phoneNumber(),
                home: '20 rue des cacahuetes',
                birthday: moment(faker.datatype.datetime()).format('YYYY-MM-DD'),
                email: faker.internet.email(),
                relationship: 'friend',
                work: faker.name.jobTitle(),
            }
            return planningApi.createOneContact(contact).then((data) => {
                createdContactId = data.id
                expect(data).to.be.eql({
                    id: data.id,
                    ...contact
                });
            })
        })
    });

    it('create contact fail not be empty', function () {
        return token(currentUserEmail).then(planningApi => {
            const contact = {
                name : '',
                phoneNumber: faker.phone.phoneNumber(),
                home: '20 rue des cacahuetes',
                birthday: moment(faker.datatype.datetime()).format('YYYY-MM-DD'),
                email: faker.internet.email(),
                relationship: 'friend',
                work: faker.name.jobTitle(),
            }
            let message = ''
            return planningApi.createOneContact(contact).catch(reason => {
                message = reason.message
            }).finally(() => {
                expect(message).equal('name MUST NOT be empty')
            })
        })
    });



    it('create contact fail phoneNumber format', function () {
        return token(currentUserEmail).then(planningApi => {
            const contact = {
                name : faker.name.findName(),
                phoneNumber: 'bad-phone-number',
                home: '20 rue des cacahuetes',
                birthday: moment(faker.datatype.datetime()).format('YYYY-MM-DD'),
                email: faker.internet.email(),
                relationship: 'friend',
                work: faker.name.jobTitle(),
            }
            let message = ''
            return planningApi.createOneContact(contact).catch(reason => {
                message = reason.message
            }).finally(() => {
                expect(message).contains('phone number MUST match regex format')
            })
        })
    });

    it('create contact fail birthday format', function () {
        return token(currentUserEmail).then(planningApi => {
            const contact = {
                name : faker.name.findName(),
                phoneNumber: faker.phone.phoneNumber(),
                home: '20 rue des cacahuetes',
                birthday: 'bad-birthday',
                email: faker.internet.email(),
                relationship: 'friend',
                work: faker.name.jobTitle(),
            }
            let message = ''
            return planningApi.createOneContact(contact).catch(reason => {
                message = reason.message
            }).finally(() => {
                expect(message).equal('birthday MUST to be in format yyyy-mm-dd')
            })
        })
    });

    it('update  one contact', function () {
        return token(currentUserEmail).then(planningApi => {
            const contact = {
                name : faker.name.findName(),
                phoneNumber: faker.phone.phoneNumber(),
                home: '20 rue des cacahuetes',
                birthday: moment(faker.datatype.datetime()).format('YYYY-MM-DD'),
                email: faker.internet.email(),
                relationship: 'Best Friend',
                work: faker.name.jobTitle(),

            }
            return planningApi.updateContact(createdContactId,contact).then((data) => {
                expect(data).to.be.eql({
                    id: createdContactId,
                    ...contact
                });
            })
        })
    });

    it('update contact fail not be empty', function () {
        return token(currentUserEmail).then(planningApi => {
            const contact = {
                name : '',
                phoneNumber: faker.phone.phoneNumber(),
                home: '20 rue des cacahuetes',
                birthday: moment(faker.datatype.datetime()).format('YYYY-MM-DD'),
                email: faker.internet.email(),
                relationship: 'friend',
                work: faker.name.jobTitle(),
            }
            let message = ''
            return planningApi.updateContact(createdContactId,contact).catch(reason => {
                message = reason.message
            }).finally(() => {
                expect(message).equal('name MUST NOT be empty')
            })
        })
    });

    it('update contact fail phoneNumber format', function () {
        return token(currentUserEmail).then(planningApi => {
            const contact = {
                name : faker.name.findName(),
                phoneNumber: 'bad-phone',
                home: '20 rue des cacahuetes',
                birthday: moment(faker.datatype.datetime()).format('YYYY-MM-DD'),
                email: faker.internet.email(),
                relationship: 'friend',
                work: faker.name.jobTitle(),
            }
            let message = ''
            return planningApi.updateContact(createdContactId,contact).catch(reason => {
                message = reason.message
            }).finally(() => {
                expect(message).contains('phone number MUST match regex format')
            })
        })
    });

    it('update contact fail birthday format', function () {
        return token(currentUserEmail).then(planningApi => {
            const contact = {
                name : faker.name.findName(),
                phoneNumber: faker.phone.phoneNumber(),
                home: '20 rue des cacahuetes',
                birthday: 'bad-birthday',
                email: faker.internet.email(),
                relationship: 'friend',
                work: faker.name.jobTitle(),
            }
            let message = ''
            return planningApi.updateContact(createdContactId,contact).catch(reason => {
                message = reason.message
            }).finally(() => {
                expect(message).equal('birthday MUST to be in format yyyy-mm-dd')
            })
        })
    });


    let createdTaskId;
    it('create one tasks', function () {
        return token(currentUserEmail).then(planningApi => {
            let task = {
                shortDescription: faker.name.findName(),
                done: moment(faker.datatype.datetime()).format('YYYY-MM-DD'),
                doneLimitDate: moment(faker.datatype.datetime()).format('YYYY-MM-DD')

            }
            return planningApi.createOneTask(createdPlanningId,task).then((data) => {
                createdTaskId = data.id
                expect(data).to.be.eql({
                    id: data.id,
                    ...task
                });
            })
        })
    });

    // it('create one tasks fail date format', function () {
    //     return token(currentUserEmail).then(planningApi => {
    //         let task = {
    //             shortDescription: faker.name.findName(),
    //             done: 'azerty',
    //             doneLimitDate: moment(faker.datatype.datetime()).format('YYYY-MM-DD')
    //
    //         }
    //         return planningApi.createOneTask(createdPlanningId,task).catch(reason => {
    //             expect(reason.message).equal('birthday MUST to be in format yyyy-mm-dd', reason)
    //         })
    //     })
    // });

    it('update  one task', function () {
        return token(currentUserEmail).then(planningApi => {
            let task = {
                id: createdTaskId,
                shortDescription: faker.name.findName(),
                done: moment(faker.datatype.datetime()).format('YYYY-MM-DD'),
                doneLimitDate: moment(faker.datatype.datetime()).format('YYYY-MM-DD')

            }
            return planningApi.updateTask(createdPlanningId,task).then((data) => {
                expect(data).to.be.eql({
                    ...task
                });
            })
        })
    });

    let createdEventId;
    it('create one event', function () {
        return token(currentUserEmail).then(planningApi => {
            let event = {
                shortDescription: faker.name.findName(),
                fullDescription: faker.name.findName(),
                startDatetime: moment(faker.datatype.datetime()).format('YYYY-MM-DDTHH:mm:ss+00:00'),
                endDatetime: moment(faker.datatype.datetime()).format('YYYY-MM-DDTHH:mm:ss+00:00'),
                contacts: []
            }
            return planningApi.createOneEvent(createdPlanningId,event).then((data) => {
                createdEventId = data.id
                expect(data).to.be.eql({
                    id: data.id,
                    ...event
                });
            })
        })
    });

    it('update  one event', function () {
        return token(currentUserEmail).then(planningApi => {
            let event = {
                id: createdEventId,
                shortDescription: faker.name.findName(),
                fullDescription: faker.name.findName(),
                startDatetime: moment(faker.datatype.datetime()).format('YYYY-MM-DDTHH:mm:ss+00:00'),
                endDatetime: moment(faker.datatype.datetime()).format('YYYY-MM-DDTHH:mm:ss+00:00'),
                contacts: []
            }
            return planningApi.updateEvent(createdPlanningId,event).then((data) => {
                expect(data).to.be.eql({
                    ...event
                });
            })
        })
    });



    // TODO neytwork config look around nginx config
    // it('delete user', function (done) {
    //     token(currentUserEmail).then(planningApi => {
    //         return planningApi.getUser().then(user => {
    //             setTimeout(() => {
    //                 return planningApi.deleteUser().then(data => {
    //                     expect(data).to.be.eql(user);
    //                     return planningApi.setToken().login(currentUserEmail, validPassword).then(token => {
    //                         expect(token).to.match(/[a-zA-Z0-9_.]+/)
    //                         done()
    //                     })
    //                 })
    //             }, 500)
    //         })
    //     })
    // });
})
