import type { JwtPayload } from 'jsonwebtoken';

export default <T>(token: string | null | JwtPayload | T): token is IToken => {
	if(typeof token === 'string') return false;
	if(token)return 'uid' in token;
	return false;
};
