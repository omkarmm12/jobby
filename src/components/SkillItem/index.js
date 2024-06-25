import './index.css'

const SkillItem = props => {
  const {skillData} = props
  const {name, imgUrl} = skillData
  return (
    <li className="skill-container">
      <img src={imgUrl} alt={name} className="skill-img" />
      <p>{name}</p>
    </li>
  )
}
export default SkillItem
