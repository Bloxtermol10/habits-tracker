import {App} from "obsidian"
import { load, loadAll } from "js-yaml"
interface Propsutilities {
    patch : string
}

export class Utilitiesfile {
    private readonly app: App
    constructor(app: App) {
        this.app = (app)
    }
    async Existing({patch} : Propsutilities) {
       const file = await this.Get({patch})
       if(file === null){
           return false
       }
           return true
    }
    async Get({patch} : Propsutilities) {

        const file = this.app.vault.getFileByPath(patch)
        if (file === null) {
            return file;
        } else {
            return file ;
        }
    }

    async Open({patch} : Propsutilities) {
        await this.Get({patch}).then((file) => {
            if (file === null) {
                throw new Error('File not found')
            }
            this.app.workspace.getLeaf().openFile(file)   
        }).catch((error) => {
            console.error(error)
        })
    }

    private async ReadFileCommon({ patch }: Propsutilities) {
        const file = await this.Get({ patch });
        if (file === null) {
            throw new Error('File not found');
        }
        const text = await this.app.vault.read(file);
        return text;
    }

    async GetProperties({patch}  : Propsutilities) {
        const text = await this.ReadFileCommon({ patch });
        return load(text.split('---')[1])
    }
    
    async GetJson({patch}  : Propsutilities) {
        const text = await this.ReadFileCommon({ patch });
        try {
        const filepart = [{}];
        const documents = loadAll(text);
           documents.forEach((doc) => {
            doc && filepart.push({doc});
           });
           return filepart 
       } catch (error) {
           return error;
       }    
    }

}