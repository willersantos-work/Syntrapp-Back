import { hash, compare } from 'bcryptjs';
import IHashProvider from "./IHashProvider";

class HashProvider implements IHashProvider{
    public async generateHash(payload:string): Promise<string>{
        const crypto_password = await hash(payload, 10);

        return crypto_password;
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean>{
        const password_matched = await compare(payload, hashed);

        return password_matched;
    }
}

export default HashProvider;
