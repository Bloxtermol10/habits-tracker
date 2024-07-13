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
    async Existingfile({patch} : Propsutilities) {
       const file = await this.Getfile({patch})
       if(file === null){
           return false
       }
           return true
    }
    async Getfile({patch} : Propsutilities) {

        const file = this.app.vault.getFileByPath(patch)
        if (file === null) {
            return file;
        } else {
            return file ;
        }
    }

    async Openfile({patch} : Propsutilities) {
        await this.Getfile({patch}).then((file) => {
            if (file === null) {
                throw new Error('File not found')
            }
            this.app.workspace.getLeaf().openFile(file)   
        }).catch((error) => {
            console.error(error)
        })
    }

    private async readFileCommon({ patch }: Propsutilities) {
        const file = await this.Getfile({ patch });
        if (file === null) {
            throw new Error('File not found');
        }
        const text = await this.app.vault.read(file);
        return text;
    }

    async Readpropertiesfile({patch}  : Propsutilities) {
        const text = await this.readFileCommon({ patch });
        return load(text.split('---')[1])
    }
    
    async Readfile({patch}  : Propsutilities) {
        const text = await this.readFileCommon({ patch });
        try {
        const filepart = [{}];
        const documents = loadAll(text);
           documents.forEach((doc) => {
            doc && filepart.push({doc});
           });
           return filepart 
       } catch (error) {
           console.error(error);
           return false;
       }    
    }

}