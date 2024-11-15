import { serverQuery } from '@/lib/serverQuery';
import { serverSQLWrite } from '@/lib/serverSQLWrite';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        var userIsAdmin = session?.roles.includes("Admin")
        return NextResponse.json(await serverQuery({isAdmin: userIsAdmin}), { status: 200})
    }
}

export async function PUT(req) {
    const session = await getServerSession(authOptions)
    if(session) {
        let systemName = req.headers.get('name');
        // console.log(systemName)
        let systemKey = req.headers.get('valName');
        let systemVal = req.headers.get('valVal');
        // return NextResponse.json(await serverSQLWrite({system: systemName, key: systemKey, value: systemVal}), { status: 200})
        return NextResponse.json('[{"id":1,"createdAt":"2024-11-13T11:32:12.000Z","updatedAt":"2024-11-14T11:28:51.000Z","name":"lifeline","location":"vm","rack":null,"rackUnits":null,"ipAddress":"192.168.84.225","dnsName":"lifeline.powellnetworks.net","adminOnly":1,"wazuhID":36,"tier":"TIER1","os":"ubuntu","dn":null,"reachable":0},{"id":2,"createdAt":"2024-11-13T11:40:14.000Z","updatedAt":"2024-11-16T03:19:39.000Z","name":"docs","location":"vm","rack":null,"rackUnits":null,"ipAddress":"192.168.84.197","dnsName":"docs.powellnetworks.net","adminOnly":0,"wazuhID":24,"tier":"TIER3","os":"ubuntu","dn":null,"reachable":0},{"id":3,"createdAt":"2024-11-14T10:26:51.000Z","updatedAt":"2024-11-14T11:29:06.000Z","name":"docker","location":"vm","rack":null,"rackUnits":null,"ipAddress":"192.168.84.235","dnsName":"docker.powellnetworks.net","adminOnly":1,"wazuhID":null,"tier":"TIER1","os":"ubuntu","dn":null,"reachable":0},{"id":4,"createdAt":"2024-11-14T10:28:05.000Z","updatedAt":"2024-11-14T11:29:56.000Z","name":"proxmox1","location":"physical","rack":"A","rackUnits":"5","ipAddress":"192.168.24.10","dnsName":"proxmox1.powellnetworks.net","adminOnly":1,"wazuhID":null,"tier":"TIER1","os":"proxmox","dn":null,"reachable":0},{"id":5,"createdAt":"2024-11-14T10:28:18.000Z","updatedAt":"2024-11-14T11:29:59.000Z","name":"proxmox2","location":"physical","rack":"A","rackUnits":"6","ipAddress":"192.168.24.11","dnsName":"proxmox2.powellnetworks.net","adminOnly":1,"wazuhID":null,"tier":"TIER1","os":"proxmox","dn":null,"reachable":0},{"id":6,"createdAt":"2024-11-14T10:28:42.000Z","updatedAt":"2024-11-14T11:30:42.000Z","name":"proxmox3","location":"physical","rack":"A","rackUnits":"14","ipAddress":"192.168.24.12","dnsName":"proxmox3.powellnetworks.net","adminOnly":1,"wazuhID":null,"tier":"TIER1","os":"proxmox","dn":null,"reachable":0},{"id":7,"createdAt":"2024-11-14T10:28:53.000Z","updatedAt":"2024-11-14T11:30:14.000Z","name":"proxmox4","location":"physical","rack":"A","rackUnits":"8","ipAddress":"192.168.24.13","dnsName":"proxmox4.powellnetworks.net","adminOnly":1,"wazuhID":null,"tier":"TIER1","os":"proxmox","dn":null,"reachable":0},{"id":8,"createdAt":"2024-11-14T10:29:07.000Z","updatedAt":"2024-11-14T11:30:11.000Z","name":"proxmox5","location":"physical","rack":"A","rackUnits":"7","ipAddress":"192.168.24.14","dnsName":"proxmox5.powellnetworks.net","adminOnly":1,"wazuhID":null,"tier":"TIER1","os":"proxmox","dn":null,"reachable":0}]', { status: 200})
    }
}