import styles from '../../styles/detail/actors.module.scss'
import fetchFromApi from './../../../lib/api'
import Arrow from './../common/Arrow';
import { Icon } from '@iconify/react'
import Title from './../main/Title';


const Actors = async ({ id }) => {

  const result = await fetchFromApi(`/movie/${id}/credits`)
  const actors = result.cast
  const imgUrl = `https://image.tmdb.org/t/p/`

  return (
    <div className={styles.actors_container}>
     <Title title={'출연진'}/>
      <div className={styles.actors_wrap} id="actors_wrap">
        {actors?.map((actor) => {
          return (
            actor.profile_path && (
              <div key={actor.id} className={styles.actor}>
                <div
                  className={styles.actor_pic}
                  style={{
                    backgroundImage: actor.profile_path
                      ? `url(${imgUrl}w200${actor.profile_path})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                  }}
                ></div>
                <p>{actor.name}</p>
              </div>
            )
          )
        })}
      </div>
      <Arrow id={'actors_wrap'}/>
    </div>
  )
}

export default Actors
