import { headers } from 'next/headers';
import { entitiesTypesMap } from '@sass-startup/db';
import {Db} from "@/db";
import {decrypt} from "@/lib/utils";


export const getUser = async () => {
  try {
    const headersList = headers();
    const authorization = headersList.get('authorization') || '';
    let user: entitiesTypesMap<'SassStartUserEntity'> | null = null;
    if (authorization !== '') {
      const token = authorization.split(' ')[1] || '';
      if (token !== '') {
        //   解码得到user
        const userDe = await decrypt<{ user: entitiesTypesMap<'SassStartUserEntity'> }>(token);
        const db = await Db.install;
        user = await db.getRepository('SassStartUserEntity').findOne({
          where: {
            id: userDe.user.id
          }
        });
      }
    }
    return user;
  } catch (e) {
    return null;
  }
};
