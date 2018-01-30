/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

const db = require('../server/db')
const {User, Team, Mission, Clue, Message, UserTeamClueStatus} = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log("db synced!")
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const missions = await Promise.all([
    Mission.create({name: 'Fierce Females in NY FiDi'}),
    Mission.create({name: 'Testing an open-ended mission'})
  ])

  const teams = await Promise.all([
    Team.create({name: 'The best team!'}),
    Team.create({name: 'Yeeeeeeaahhhh team'}),
    Team.create({name: 'You wish you were on our team'})
  ])

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', userName: 'cody'}),
    User.create({email: 'murphy@email.com', password: '123', userName: 'murphy'})
  ])

  const clues = await Promise.all([
    Clue.create({prompt: 'She stands fearless in the face of money maniacs!', hint1: 'No BULL-y can make her stand down!', hint2: 'She might be small, but her STATU-rE is strong...', gps: [40.7056, 74.0134], region: 'NYC FiDi', answer: 'Fearless girl'}),
    Clue.create({prompt: 'If you\’re feeling buggy, this school is for you...', hint1: 'If you want to answer this clue, you’d better get HOPPin\’!', hint2: 'The clock is ticking… but one hand is moving the wrong way! Who set the clocks like that?!', gps: [40.7051, 74.0092], region: 'NYC FiDi', answer: 'Grace Hopper Program'}),
    Clue.create({prompt: 'Muriel “Mickie” Siebert was the first woman to purchase a seat here in 1967', hint1: 'You won\’t get anything for free here, but you can strike a deal!', hint2: 'This is a place where money is traded and hearts are broken...', gps: [40.70756, 74.010789], region: 'NYC FiDi', answer: 'NY Stock Exchange'}),
    Clue.create({prompt: 'Here you can learn about wall street pioneers like Isabel Benham, Abigail Adams and Hetty Green', hint1: 'There haven\’t been many women in Finance throughout history...', hint2: 'Put the fun in finance!', gps: [40.7064, 74.0093], region: 'NYC FiDi', answer: 'Museum of Finance'}),
    Clue.create({prompt: 'Find a new coffee shop and take a picture with the barista!', hint1: 'Can\'t wait to caffeinate', hint2: 'Time\'s running out!'})
  ])

  const messages = await Promise.all([
    Message.create({text: 'Hey hey! Welcome to the party!', teamId: 1, userId: 1}),
    Message.create({text: 'I\'m going to win. Mwahaha!', teamId: 1, userId: 2}),
    Message.create({text: 'I love games', teamId: 1, userId: 1}),
    Message.create({text: 'What do you call a crowd of chess players bragging about their wins in a hotel lobby?', teamId: 1, userId: 2}),
    Message.create({text: 'Chess nuts boasting in an open foyer.', teamId: 1, userId: 2}),
    Message.create({text: '...', teamId: 1, userId: 1})
  ])
//'unassigned', 'assigned', 'completed'
  const userTeamClueStatuses = await Promise.all([
    UserTeamClueStatus.create({status: 'unassigned'})
    .then((clue) => {
      clue.setTeam(1)
      return clue
    })
    .then((clue) => {
      clue.setClue(1)
    }),
    UserTeamClueStatus.create({status: 'unassigned'})
    .then((clue) => {
      clue.setTeam(1)
      return clue
    })
    .then((clue) => {
      clue.setClue(2)
    }),
    UserTeamClueStatus.create({status: 'unassigned'})
    .then((clue) => {
      clue.setTeam(1)
      return clue
    })
    .then((clue) => {
      clue.setClue(3)
    }), 
    UserTeamClueStatus.create({status: 'unassigned'})
    .then((clue) => {
      clue.setTeam(1)
      return clue
    })
    .then((clue) => {
      clue.setClue(4)
    })
   
  ])

  const teamMembers = await Promise.all([
    Team.findById(1)
    .then(foundTeam => {
      return foundTeam.setUsers([1, 2])
    })
  ])

  const teamMissions = await Promise.all([
    Mission.findById(1)
    .then(found => {
      return found.setTeams([1, 2])
    }),
    Mission.findById(2)
    .then(found => {
      return found.setTeams([3])
    })
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users, ${teams.length} teams, ${missions.length} missions, ${clues.length} clues`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log("closing db connection")
    db.close()
    console.log("db connection closed")
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log("seeding...")
