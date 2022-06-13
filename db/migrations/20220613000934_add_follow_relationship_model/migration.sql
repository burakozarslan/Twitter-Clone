-- CreateTable
CREATE TABLE "Follows" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "followerId" INTEGER NOT NULL,
    "followeeId" INTEGER NOT NULL,

    PRIMARY KEY ("followerId", "followeeId"),
    CONSTRAINT "Follows_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follows_followeeId_fkey" FOREIGN KEY ("followeeId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
