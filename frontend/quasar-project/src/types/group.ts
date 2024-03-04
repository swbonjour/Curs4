export interface GroupDto {
    _id: string;
    name: string;
    allowed_users: string[];
    owner: string;
}